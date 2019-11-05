import local from "./local.json";

export default NODE_ENV => {
  if (!["development", "test"].includes(NODE_ENV)) return;

  if (local[NODE_ENV])
    Object.entries(local[NODE_ENV]).map(([k, v]) => {
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
