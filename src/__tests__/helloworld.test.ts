import helloWorld from "../helloworld";


describe('App tests go in here', () => {
    it('should return "Hello World!"', () => {
        // expect(true).toEqual(false);
        expect(helloWorld()).toEqual("Hello World!")
    });
});