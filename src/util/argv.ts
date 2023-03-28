export const getArgvMap = () => {
  const argvs = process.argv;
  const m = new Map();
  for (let item of argvs) {
    const [key, v] = item.split("=");
    m.set(key, v);
  }
  return m;
};
