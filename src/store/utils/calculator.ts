import { Errors } from "../types";

function applyOp(op: string, b: number, a: number) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b == 0) {
                throw new Error(Errors.DivideBy0);
            }
            return parseInt(`${a / b}`, 10);
    }
    return 0;
}

function hasPrecedence(op1: string, op2: string) {
    if ((op1 == '*' || op1 == '/') &&
        (op2 == '+' || op2 == '-')) {
        return false;
    }
    return true;
}

export function isDigit(n: string) {
    if ((+n >= 0 && +n <= 9) || n === ".") {
        return true;
    }
    return false;
}

export const evaluateExpression = (str: string) => {
    const tokens = str.split("");
    const operands: number[] = [];
    const operators: string[] = [];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (isDigit(token)) {
            let num = "";

            while (isDigit(tokens[i]) && i < tokens.length) {
                num = num + tokens[i];
                i = i + 1;
            }

            operands.push(+num);
            i = i - 1;
        } else if (token === "+" || token === "-" || token === "*" || token === "/") {
            while (operators.length > 0 && hasPrecedence(tokens[i], operators[operators.length - 1])) {
                const answer = applyOp(operators.pop() as string, operands.pop() as number, operands.pop() as number);
                operands.push(answer);
            }
            operators.push(token);
        }

    }

    while (operators.length > 0) {
        const answer = applyOp(operators.pop() as string, operands.pop() as number, operands.pop() as number);
        operands.push(answer);
    }

    return operands.pop() ?? 0;
};

export const isOperator = (key: string) => {
    if (["+", "-", "*", "/"].includes(key)) {
        return true;
    }

    return false;
};