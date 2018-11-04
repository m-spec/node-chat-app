const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'test';
        const text = 'text';
        const message = generateMessage(from, text);

        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'test';
        const lat = 15;
        const long = -12;
        const message = generateLocationMessage(from, lat, long);
        
        const url = 'https://www.google.com/maps?q=15,-12';

        expect(message).toInclude({from, url});
        expect(message.createdAt).toBeA('number');
    });
});