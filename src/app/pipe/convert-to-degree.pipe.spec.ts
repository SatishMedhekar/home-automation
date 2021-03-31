import { ConvertToDegree } from "./convert-to-degree.pipe";

describe('ConvertToDegree', () => {
    it('it should display degree along with number', () => {
        let pipe = new ConvertToDegree();

        let val = pipe.transform('5');
        expect(val).toEqual('5' + '\u00B0')
    })
})