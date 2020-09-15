var Bicicleta = require("../../models/bicicleta");

beforeEach(() => { Bicicleta.allBicis = []; });

describe("Bicicleta.allBicis", () => {
    it("comienza vacia", () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe("Bicicleta.add", () => {
    it("agregamos una", () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, "rojo", "urbana", [-34.6012424,-58.3861497]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe("Bicicleta.findBy", () => {
    it("debe devolver la bici con id 1", () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var aBici = new Bicicleta(1, "verde", "urbana");
        var aBici2 = new Bicicleta(2, "rojo", "montaña");
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);

        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);

    });
});

/* FALTA ARREGLAR ESTOOOOO!!!!!!!

describe("Bicicleta.removeById", () => {
    it("borramos una", () => {
        var aBici = new Bicicleta(1, "verde", "urbana");
        Bicicleta.add(aBici);
        expect(Bicicleta.allBicis.length).toBe(1);
        Bicicleta.removeById(aBici);
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});
*/