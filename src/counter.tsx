import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, incrementByAmount } from "./store/slices/counter";
import { ApplicationState } from "./store/types";

const Counter = () => {
    const count = useSelector((state: ApplicationState) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
};

export default Counter;