import local from "./local.json";

export default ENV => {
  if (!["development", "test"].includes(ENV)) return;

  Object.entries(local[ENV]).map(([k, v]) => {
    setEnv(k, v);
  });

  Object.entries(local).map(([k, v]) => {
    if (!["string", "number"].includes(typeof v)) return;
    setEnv(k, v);
  });
};

function setEnv(k, v) {
  if (!process.env[k]) process.env[k] = v;
}
