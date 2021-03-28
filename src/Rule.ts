import { RULES } from './utils';

export default class Rule {
    constructor({
        ruleType,
        ruleParams = [],
        message,
        validate,
    }: {
        ruleType: string,
        ruleParams?: any[],
        message?: string,
        validate: (value: any) => boolean,
    }) {
        this.ruleType = ruleType;
        this.ruleParams = ruleParams;
        this.validate = validate ?? (() => { throw new Error('Params "validate" call not be null.'); });
        this.message = message ?? `${ruleType} validate error.`;
    }

    ruleType: string;

    ruleParams: any[];

    /**
     * Result
     * true pass
     * false fail
     */
    validate: (value: any) => boolean;

    message: string;

    add(): PropertyDecorator {
        if (!(this instanceof Rule)) throw new Error('"this instanceof Rule" equal false. This must be instanceof Rule.');
        const self = this;

        return function validate({ constructor }: Object, propertyKey: string) {
            const rules = constructor[RULES][propertyKey] ?? [];

            rules.push(self);

            constructor[RULES][propertyKey] = rules;
        };
    }
}
