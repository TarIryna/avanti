export const getParams = (string) => {
  if (!string) return {};
  const paramsString = string?.split("api/products?")[1];
  const paramsArray = paramsString?.split("&");
  const params = {};
  paramsArray?.map((item) => {
    const name = item?.split("=")[0];
    const value = item?.split("=")[1];
    Object.assign(params, { [name]: value });
  });
  return params;
};
