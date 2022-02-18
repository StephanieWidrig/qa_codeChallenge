import { EmployeeHandler } from "./pageObjects/EmployeeHandler";

const em = new EmployeeHandler();

describe("Employee Manager", () => {
  beforeEach(async () => {
    await em.navigate();
  });
  afterAll(async () => {
    await em.quit();
  });
  it("can add a new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "test person",
      phone: "1234567890",
      title: "test result",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("test person");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("test person");
    expect(employee.phone).toEqual("1234567890");
    expect(employee.title).toEqual("test result");
  });
  it("can edit an existing employee", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({ title: "Grand Poobah" });
    await em.saveChanges();
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Bernice Ortiz");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id: 1,
      name: "Bernice Ortiz",
      phone: "4824931093",
      title: "Grand Poobah",
    });
    it("can cancel an edit", async () => {
      await em.selectEmployeeByName("Dollie Berry");
      await em.editEmployee({ title: "Stephanie Widrig" });
      await em.cancelChanges();
      let employee = await em.getEmployeeInfo();
      expect(employee).toEqual({
        id: "5" ,
        name: "Dollie Berry",
        phone: "4873459812",
        title: "Front-End Developer", 
      });
      it("can add a new employee", async () => {
        await em.addEmployee();
        await em.selectEmployeeByName("New Employee");
        await em.editEmployee({
          name: "Stephanie Widrig",
          phone: "8675309",
          title: "SAHM",
        });
        await em.saveChanges();
        await em.selectEmployeeByName("Dollie Berry");
        await em.selectEmployeeByName("Stephanie Widrig");
        let employee = await em.getEmployeeInfo();
        expect(employee.name).toEqual("Stephanie Widrig");
        expect(employee.phone).toEqual("8675309");
        expect(employee.title).toEqual("SAHM");
    });
    it("can navigate await without saving the changes", async ()=> {
      await em.selectEmployeeByName("Teresa Osborne");
      await em.editEmployee({ title: "h.b.i.c" });
      await em.selectEmployeeByName("Dollie Berry");
      await em.selectEmployeeByName("Teresa Osborne")
      let employee = await em.getEmployeeInfo();
      expect(employee).toEqual({
        id: 4,
        name: "Theresea Osborne",
        phone: "3841238745",
        title: "Director of Engineering"
    });
  });
  });
});
});