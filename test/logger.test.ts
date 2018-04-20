import { assert } from 'chai';
import { getLogger } from '../src';

describe('logger', () => {
    it('should return same logger instance', () => {
        assert.equal(getLogger(), getLogger());
    });

    it('should create specific loggers', () => {
        assert.notEqual(getLogger(), getLogger('other'));
    });
});
