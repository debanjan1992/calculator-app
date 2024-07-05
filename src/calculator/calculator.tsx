
import { useDispatch, useSelector } from "react-redux";
import "./calculator.scss";
import { calculate, update } from "../store/slices/calculator";
import { useEffect } from "react";
import { isDigit, isOperator } from "../store/utils/calculator";

const Calculator = () => {
    const { display, value, error } = useSelector((state: any) => state.calculator);
    const dispatch = useDispatch();

    const onButtonClick = (key: string) => {
        if (key === "=" || key === "Enter") {
            dispatch(calculate("="));
        } else {
            dispatch(update(key));
        }
    };

    useEffect(() => {
        const onKeyPress = (e: KeyboardEvent) => {
            if (isDigit(e.key) || isOperator(e.key) || e.key === "Enter" || e.key === "Backspace") {
                onButtonClick(e.key);
            }
            e.preventDefault();
            e.stopPropagation();
        };
        document.addEventListener("keyup", e => onKeyPress(e));

        return () => document.removeEventListener("keyup", e => onKeyPress(e));
    }, []);

    return <div className="container">
        <div className="display">
            <p style={{
                fontSize: error ? "20px" : "inherit"
            }}>{display}</p>
        </div>
        <div className="button-wrapper">
            <div className="row">
                <div className="secondary-display">{isNaN(value) ? "..." : value }</div>
                <div className="btn action" onClick={() => onButtonClick("AC")}>AC</div>
                {/* <div className="btn action" onClick={() => onButtonClick("()")}>{"()"}</div> */}
                {/* <div className="btn action" onClick={() => onButtonClick("%")}>%</div> */}
                <div className="btn action" onClick={() => onButtonClick("/")}>/</div>
            </div>
            <div className="row">
                <div className="btn" onClick={() => onButtonClick("7")}>7</div>
                <div className="btn" onClick={() => onButtonClick("8")}>8</div>
                <div className="btn" onClick={() => onButtonClick("9")}>9</div>
                <div className="btn action" onClick={() => onButtonClick("X")}><span className="material-symbols-outlined">
                    close
                </span></div>
            </div>
            <div className="row">
                <div className="btn" onClick={() => onButtonClick("4")}>4</div>
                <div className="btn" onClick={() => onButtonClick("5")}>5</div>
                <div className="btn" onClick={() => onButtonClick("6")}>6</div>
                <div className="btn action" onClick={() => onButtonClick("-")}><span className="material-symbols-outlined">
                    remove
                </span></div>
            </div>
            <div className="row">
                <div className="btn" onClick={() => onButtonClick("1")}>1</div>
                <div className="btn" onClick={() => onButtonClick("2")}>2</div>
                <div className="btn" onClick={() => onButtonClick("3")}>3</div>
                <div className="btn action" onClick={() => onButtonClick("+")}><span className="material-symbols-outlined">
                    add
                </span></div>
            </div>
            <div className="row">
                <div className="btn" onClick={() => onButtonClick("0")}>0</div>
                <div className="btn action" onClick={() => onButtonClick(".")}>.</div>
                <div className="btn action" onClick={() => onButtonClick("Backspace")}><span className="material-symbols-outlined">
                    backspace
                </span></div>
                <div className="btn action calculate" onClick={() => onButtonClick("=")}><span className="material-symbols-outlined">
                    equal
                </span></div>
            </div>
        </div>
    </div>
};

export default Calculator;