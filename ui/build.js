import Bundler from "parcel-bundler";

const bundler = new Bundler("src/index.html", {
  cache: false,
  autoInstall: false,
  watch: false,
  scopeHoist: true
});

bundler.bundle();
