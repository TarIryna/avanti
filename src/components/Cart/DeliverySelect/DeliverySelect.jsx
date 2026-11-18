'use client';
import Select from '@/components/ui/Select/Select';

// Keep existing delivery callers compatible with the shared asynchronous select.
const DeliverySelect = props => <Select {...props} variant="async" />;
export default DeliverySelect;
