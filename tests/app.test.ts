/**
 * Frontend configuration and environment unit test.
 * Runs with Node.js built-in test runner or any test framework.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { siteConfig } from "../src/config/site";
import { cn } from "../src/lib/utils";

test("siteConfig contains valid defaults", () => {
  assert.equal(siteConfig.name, "Paperless");
  assert.ok(siteConfig.description.length > 0);
});

test("cn utility joins classes correctly", () => {
  const result = cn("class-a", false && "class-b", undefined, "class-c");
  assert.equal(result, "class-a class-c");
});
