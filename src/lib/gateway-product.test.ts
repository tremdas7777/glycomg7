import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { assertGatewayProductAdmin, gatewayBumpTitle, gatewayProductNameSchema, resolveGatewayProductName } from "./gateway-product";

describe("Gateway product configuration", () => {
  it("keeps Glicomax when no custom name exists", () => {
    assert.equal(resolveGatewayProductName(undefined), "Glicomax");
    assert.equal(resolveGatewayProductName(null), "Glicomax");
  });
  it("uses the saved name rather than the store brand", () => {
    assert.equal(resolveGatewayProductName("  Produto Teste  "), "Produto Teste");
    assert.equal(gatewayBumpTitle("Produto Teste", "vivicap"), "Produto Teste Cap");
    assert.equal(gatewayBumpTitle("Produto Teste", "adesivos"), "Produto Teste Adesivo");
  });
  it("rejects empty or malformed names", () => {
    for (const name of ["", "   ", "a".repeat(81), "Produto\nTeste", "<script>"]) {
      assert.equal(gatewayProductNameSchema.safeParse(name).success, false);
    }
  });
  it("requires the actual configured admin password", () => {
    assert.throws(() => assertGatewayProductAdmin("wrong", "test-only-password"), /Não autorizado/);
    assert.throws(() => assertGatewayProductAdmin("", undefined), /Não autorizado/);
    assert.doesNotThrow(() => assertGatewayProductAdmin("test-only-password", "test-only-password"));
  });
});