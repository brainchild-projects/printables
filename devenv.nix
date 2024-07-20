{ pkgs, lib, config, inputs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "Printables";

  # https://devenv.sh/packages/
  packages = with pkgs; [
    nodejs_18
  ];

  # https://devenv.sh/scripts/
  scripts.hello.exec = "echo $GREET";

  enterShell = ''
    hello
  '';

  # https://devenv.sh/tests/
  enterTest = ''
    echo "Running tests"
    npm test
  '';
  processes.serve.exec = "npm start";
}
