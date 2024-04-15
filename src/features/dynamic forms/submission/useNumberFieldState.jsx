import React, { useState } from 'react';

function useNumberFieldState() {
    const [operator, setOperator] = useState({});
    const [showRangeInputs, setShowRangeInputs] = useState({});
    const [fromValue, setFromValue] = useState({});
    const [toValue, setToValue] = useState({});

    const handleOperatorChange = (fieldId, value) => {
        setOperator((prevState) => ({
            ...prevState,
            [fieldId]: value,
        }));
        setShowRangeInputs((prevState) => ({
            ...prevState,
            [fieldId]: value,
        }));
    };

    return {
        operator,
        showRangeInputs,
        fromValue,
        toValue,
        handleOperatorChange,
        setFromValue,
        setToValue,
    };
}

export default useNumberFieldState;
