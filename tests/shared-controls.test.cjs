const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const test = require('node:test');
const React = require('react');
const ts = require('typescript');

let formContext;
const hooks = {
  ...React,
  useId: () => 'test-field',
  useState: initial => [typeof initial === 'function' ? initial() : initial, () => {}],
  useRef: value => ({ current: value }),
  useEffect: () => {},
  useMemo: calculate => calculate(),
};
const styles = new Proxy({}, { get: (_, key) => `Styled${String(key)}` });
const load = file => {
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(code, {
    module, exports: module.exports,
    require: name => {
      if (name === 'react') return hooks;
      if (name === 'react-hook-form') return { ...require(name), useFormContext: () => formContext };
      if (name === './styles') return styles;
      if (name === '@/components/icons') return { IconEye: 'Eye', IconEyeOff: 'EyeOff' };
      if (name === 'next/image') return { __esModule: true, default: 'Image' };
      if (name.includes('close2.svg')) return { __esModule: true, default: 'close.svg' };
      if (name === './AsyncSelect') return { __esModule: true, default: 'AsyncSelect' };
      return require(name);
    },
  }, { filename: file });
  return module.exports;
};
const inputs = load('src/components/ui/Input/Input.jsx');
const selects = load('src/components/ui/Select/Select.jsx');
const find = (node, type) => {
  if (!node || typeof node !== 'object') return null;
  if (node.type === type) return node;
  for (const child of React.Children.toArray(node.props?.children)) {
    const found = find(child, type);
    if (found) return found;
  }
  return null;
};

test('plain date/number inputs preserve DOM props, constraints, styling and refs', () => {
  formContext = null;
  const ref = { current: null };
  const input = inputs.default.render({ variant: 'plain', type: 'date', min: '2026-01-01', max: '2026-12-31', required: true, className: 'existing', 'aria-label': 'Date', id: 'date', value: '2026-11-17' }, ref);
  assert.equal(input.type, 'input');
  assert.equal(input.props.className, 'existing');
  assert.equal(input.props.min, '2026-01-01');
  assert.equal(input.props.max, '2026-12-31');
  assert.equal(input.props.required, true);
  assert.equal(input.props['aria-label'], 'Date');
  assert.equal(input.props.id, 'date');
  assert.equal(input.props.step, undefined);
  const node = { focus() {} };
  input.ref(node);
  assert.equal(ref.current, node);
  input.ref(null);
  assert.equal(ref.current, null);
  const number = inputs.default.render({ variant: 'plain', type: 'number', min: 0, max: 10, step: 0.01 });
  assert.equal(number.props.step, 0.01);
  assert.equal(number.props.max, 10);
});

test('checkboxes and files preserve native DOM, checked/files callbacks and upload ref', () => {
  formContext = null;
  let calls = 0;
  const checkbox = inputs.default.render({ type: 'checkbox', checked: true, onChange: () => calls++ });
  assert.equal(checkbox.type, 'input');
  assert.equal(checkbox.props.checked, true);
  checkbox.props.onChange({ target: { checked: false } });
  assert.equal(calls, 1);
  const file = inputs.default.render({ type: 'file', multiple: true, hidden: true, accept: 'image/*' });
  assert.equal(file.props.multiple, true);
  assert.equal(file.props.hidden, true);
  assert.equal(file.props.accept, 'image/*');
});

test('automatic react-hook-form registration keeps validation and invokes callbacks once', () => {
  let changes = 0, blurs = 0, customChanges = 0, customBlurs = 0;
  const registeredRef = { current: null };
  formContext = {
    register: (name, rules) => {
      assert.equal(name, 'amount');
      assert.equal(rules.required, true);
      return { onChange: () => changes++, onBlur: () => blurs++, ref: node => { registeredRef.current = node; } };
    },
    formState: { errors: { amount: { message: 'Required' } } },
  };
  const tree = inputs.default.render({ name: 'amount', rules: { required: true }, onValueChange: () => customChanges++, onBlurHandler: () => customBlurs++ });
  const input = find(tree, 'StyledInput');
  input.props.onChange({ target: { value: '12' } });
  input.props.onBlur({});
  input.ref('field');
  assert.equal(changes, 1);
  assert.equal(customChanges, 1);
  assert.equal(blurs, 1);
  assert.equal(customBlurs, 1);
  assert.equal(registeredRef.current, 'field');
  assert.equal(find(tree, 'StyledError').props.children, 'Required');
});

test('Controller/register supplied handlers and refs do not register a field twice', () => {
  formContext = { register: () => { throw new Error('Double registration'); }, formState: { errors: {} } };
  let changes = 0, blurs = 0;
  const ref = { current: null };
  const change = () => changes++;
  const tree = inputs.default.render({ name: 'size', value: 2, onChange: change, onValueChange: change, onBlur: () => blurs++ }, ref);
  const input = find(tree, 'StyledInput');
  input.props.onChange({});
  input.props.onBlur({});
  input.ref('controller-field');
  assert.equal(changes, 1);
  assert.equal(blurs, 1);
  assert.equal(ref.current, 'controller-field');
  const controlled = inputs.default.render({ name: 'phone', value: '050', onValueChange: change });
  find(controlled, 'StyledInput').props.onChange({});
  assert.equal(changes, 2);
});

test('InputControl stays standalone inside forms and keeps exactly one input element', () => {
  formContext = { register: () => { throw new Error('Unexpected registration'); } };
  const wrapper = inputs.InputControl.render({ name: '36', value: 1, className: 'quantity' }, null);
  const input = inputs.default.render(wrapper.props, wrapper.ref);
  assert.equal(input.type, 'input');
  assert.equal(input.props.className, 'quantity');
});

test('native selects preserve their option elements, validation, value and event contract', () => {
  const children = React.createElement('option', { value: '2' }, 'A2');
  let selected;
  const ref = { current: null };
  const select = selects.default.render({ variant: 'native', name: 'shop', value: '2', required: true, children, onChange: event => { selected = event.target.value; } }, ref);
  assert.equal(select.type, 'select');
  assert.equal(select.props.children, children);
  assert.equal(select.props.value, '2');
  assert.equal(select.props.required, true);
  select.props.onChange({ target: { value: '3' } });
  assert.equal(selected, '3');
  assert.equal(select.ref, ref);
});

test('custom selects keep multi-value selection and cannot submit their enclosing form', () => {
  const component = selects.default.render({ value: [1], isMulti: true, options: [{ id: 1, name: 'One' }], onChange() {} });
  const tree = component.type(component.props);
  assert.equal(find(tree, 'StyledSelectButton').props.type, 'button');
  assert.equal(find(tree, 'StyledRemoveTagBtn').props.type, 'button');
  const disabledComponent = selects.default.render({ value: 0, disabled: true, options: [{ value: 0, name: 'Zero' }] });
  const disabledTree = disabledComponent.type(disabledComponent.props);
  assert.equal(find(disabledTree, 'StyledSelectButton').props.disabled, true);
  assert.equal(find(disabledTree, 'StyledSelectButton').props.children.props.children, 'Zero');
});

test('asynchronous select preserves the delivery fetch and selection callback contracts', () => {
  const fetchOptions = async () => [{ label: 'City', value: 'city-id' }];
  const onChange = () => {};
  const selected = { label: 'City', value: 'city-id' };
  const component = selects.default.render({ variant: 'async', fetchOptions, onChange, defaultValue: selected, value: 'City' });
  assert.equal(component.type, 'AsyncSelect');
  assert.equal(component.props.fetchOptions, fetchOptions);
  assert.equal(component.props.onChange, onChange);
  assert.equal(component.props.defaultValue, selected);
  assert.equal(component.props.value, 'City');
});

test('all project inputs and selects use the shared UI implementations', () => {
  const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)],
  );
  const violations = [];
  for (const file of walk('src').filter(file => /\.(jsx|tsx|js|ts)$/.test(file))) {
    if (/components[\\/]ui[\\/](Input|Select)[\\/]/.test(file)) continue;
    const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true,
      file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.JSX);
    const visit = node => {
      if ((ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) && ['input', 'select'].includes(node.tagName.getText(source))) violations.push(file);
      if (ts.isTaggedTemplateExpression(node) && ts.isPropertyAccessExpression(node.tag) && node.tag.expression.getText(source) === 'styled' && ['input', 'select'].includes(node.tag.name.text)) violations.push(file);
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  assert.deepEqual(violations, []);
});
