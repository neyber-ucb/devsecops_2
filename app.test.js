const fs = require("fs");

describe("Project structure tests", () => {
  test("app.js exists", () => {
    expect(fs.existsSync("./app.js")).toBe(true);
  });

  test("package.json exists", () => {
    expect(fs.existsSync("./package.json")).toBe(true);
  });

  test("Semgrep rules directory exists", () => {
    expect(fs.existsSync("./rules")).toBe(true);
  });

  test("app.js contains express setup", () => {
    const content = fs.readFileSync("./app.js", "utf-8");
    expect(content).toContain('require("express")');
  });
});
