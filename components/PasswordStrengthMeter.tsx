import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

interface PasswordStrengthMeterProps {
    minLength?: number;
    forceNumber?: boolean;
    forceCapitalLetter?: boolean;
    forceSpecialChar?: boolean;
    showFeedbackText?: boolean;
    showStrengthBar?: boolean;
    onChange: (s: string) => void;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
    minLength = 8,
    forceNumber = false,
    forceCapitalLetter = false,
    forceSpecialChar = false,
    showFeedbackText = false,
    showStrengthBar = true,
    onChange,
}) => {
    const [score, setScore] = useState(0);
    const [password, setPassword] = useState("");
    const [passwordMissingCapitalLetter, setPasswordMissingCapitalLetter] =
        useState(forceCapitalLetter);
    const [passwordMissingNumber, setPasswordMissingNumber] =
        useState(forceNumber);
    const [
        passwordMissingNumberSpecialChar,
        setPasswordMissingNumberSpecialChar,
    ] = useState(forceSpecialChar);

    const styles = StyleSheet.create({
        title: {
            fontWeight: "bold",
            color: "black",
            fontSize: 16,
        },
        text: {
            color: "black",
        },
        inputField: {
            marginTop: 10,
            marginBottom: 10,
            height: 40,
            borderWidth: 1,
            padding: 10,
        },
        barContainer: {
            height: 8,
            backgroundColor: "lightgrey",
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 10,
        },
        bar: {
            height: 8,
            borderRadius: 10,
        },
    });

    useEffect(() => {
        checkPasswordStrength();
    }, [password]);

    function checkPasswordStrength() {
        let missingNumberSpecialChar = forceSpecialChar;
        let missingNumber = forceNumber;
        let missingCapitalLetter = forceCapitalLetter;
        let score_temp = 0;
        if (password.match(/[a-z]/)) {
            score_temp += 1;
        }

        if (password.match(/[A-Z]/)) {
            missingCapitalLetter = false;
            score_temp += 1;
        }
        if (password.match(/\d+/)) {
            missingNumber = false;
            score_temp += 1;
        }
        if (password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) {
            missingNumberSpecialChar = false;
            score_temp += 1;
        }

        //Set score to 0 if any requirements are not met
        if (missingNumberSpecialChar) {
            setScore(0);
        } else if (missingNumber) {
            setScore(0);
        } else if (missingCapitalLetter) {
            setScore(0);
        } else if (password.length < minLength) {
            setScore(0);
        } else {
            setScore(score_temp); //If all requirements are met, set the score
        }

        setPasswordMissingNumberSpecialChar(missingNumberSpecialChar);
        setPasswordMissingNumber(missingNumber);
        setPasswordMissingCapitalLetter(missingCapitalLetter);
    }

    function getFeedbackText() {
        let feedbackText = "";
        if (password.length < minLength) {
            feedbackText += `Your password should be at least ${minLength} characters long. \n`;
        }
        if (passwordMissingCapitalLetter) {
            feedbackText +=
                "Your password should contain at least one uppercase letter. \n";
        }
        if (passwordMissingNumber) {
            feedbackText +=
                "Your password should contain at least one number. \n";
        }
        if (passwordMissingNumberSpecialChar) {
            feedbackText +=
                "Your password should contain at least one special character. \n";
        }
        return feedbackText;
    }

    return (
        <View style={{ width: "90%" }}>
            <Text style={styles.title}>Enter password:</Text>
            <TextInput
                onChangeText={(input) => {
                    onChange(input);
                    setPassword(input);
                }}
                value={password}
                style={styles.inputField}
            />
            {showStrengthBar ? (
                <View>
                    <Text style={styles.text}>
                        Password strength: {score}/4
                    </Text>
                    <View style={styles.barContainer}>
                        <View
                            style={[
                                styles.bar,
                                {
                                    width: `${(score / 4) * 100}%`,
                                    backgroundColor: getColor(score),
                                },
                            ]}
                        />
                    </View>
                </View>
            ) : null}
            <Text>{showFeedbackText ? getFeedbackText() : null}</Text>
        </View>
    );
};

function getColor(score: number) {
    if (score === 0) {
        return "gray";
    } else if (score === 1) {
        return "red";
    } else if (score === 2) {
        return "yellow";
    } else if (score === 3) {
        return "blue";
    } else {
        return "green";
    }
}

export default PasswordStrengthMeter;
