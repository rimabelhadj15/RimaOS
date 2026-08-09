console.log("Robotics Quiz loaded");


function startRoboticsQuiz() {

    const intro =
        document.getElementById("quiz-intro");

    const questionScreen =
        document.getElementById("quiz-question");

    const result =
        document.getElementById("quiz-result");

    const final =
        document.getElementById("quiz-final");


    const startButton =
        document.getElementById("start-quiz");

    const nextButton =
        document.getElementById("next-question");

    const restartButton =
        document.getElementById("restart-quiz");


    const questionText =
        document.getElementById("question-text");

    const questionNumber =
        document.getElementById("question-number");

    const totalQuestions =
        document.getElementById("total-questions");

    const answers =
        document.querySelectorAll(".answer");


    const resultIcon =
        document.getElementById("result-icon");

    const resultTitle =
        document.getElementById("result-title");

    const resultMessage =
        document.getElementById("result-message");

    const explanation =
        document.getElementById(
            "explanation-text"
        );

    const correctAnswer =
        document.getElementById(
            "correct-answer"
        );

    const finalScore =
        document.getElementById(
            "final-score"
        );

    const finalLevel =
        document.getElementById(
            "final-level"
        );


    const questions = [

    {
        question: "What is the main role of a sensor in a robot?",

        options: {
            A: "To receive information from the environment",
            B: "To provide electrical power",
            C: "To move the robot",
            D: "To store programs"
        },

        correct: "A",

        explanation:
            "Sensors allow a robot to detect information about its environment, such as distance, temperature, light, acceleration, or pressure."
    },


    {
        question: "What is an actuator?",

        options: {
            A: "A device that measures temperature",
            B: "A device that performs physical action",
            C: "A programming language",
            D: "A type of battery"
        },

        correct: "B",

        explanation:
            "Actuators convert electrical or other forms of energy into physical movement. Motors and servos are common robotic actuators."
    },


    {
        question: "What does an ultrasonic sensor commonly measure?",

        options: {
            A: "Distance",
            B: "Voltage",
            C: "Humidity",
            D: "Magnetic field"
        },

        correct: "A",

        explanation:
            "An ultrasonic sensor sends a sound wave and measures the time needed for its echo to return. From this time, the distance can be calculated."
    },


    {
        question: "What does PWM allow a microcontroller to control?",

        options: {
            A: "Only temperature",
            B: "Motor speed or LED brightness",
            C: "Wi-Fi passwords",
            D: "Battery chemistry"
        },

        correct: "B",

        explanation:
            "PWM changes the duty cycle of a digital signal. This can be used to control motor speed, LED brightness, and other devices."
    },


    {
        question: "What does the MPU6050 contain?",

        options: {
            A: "Camera and microphone",
            B: "GPS and magnetometer",
            C: "Accelerometer and gyroscope",
            D: "Ultrasonic transmitter"
        },

        correct: "C",

        explanation:
            "The MPU6050 contains a 3-axis accelerometer and a 3-axis gyroscope, making it useful for detecting movement and orientation."
    },


    {
        question: "What communication protocol is commonly used by sensors such as the MPU6050?",

        options: {
            A: "I2C",
            B: "HDMI",
            C: "USB-C only",
            D: "VGA"
        },

        correct: "A",

        explanation:
            "The MPU6050 commonly communicates using I2C, which allows multiple devices to communicate using shared SDA and SCL lines."
    },


    {
        question: "What is the purpose of an encoder on a robot motor?",

        options: {
            A: "To measure motor position or rotation",
            B: "To increase battery voltage",
            C: "To detect temperature only",
            D: "To generate Wi-Fi"
        },

        correct: "A",

        explanation:
            "Encoders provide feedback about motor rotation or position. This feedback can be used for accurate movement and closed-loop control."
    },


    {
        question: "What is PID control mainly used for?",

        options: {
            A: "Controlling a system using feedback",
            B: "Creating 3D models",
            C: "Sending emails",
            D: "Formatting an SD card"
        },

        correct: "A",

        explanation:
            "PID control uses feedback to reduce the difference between a desired value and the actual value. It is widely used for motors, balancing robots, temperature control, and more."
    },


    {
        question: "What is ROS 2 mainly used for?",

        options: {
            A: "Robot software development",
            B: "Charging robot batteries",
            C: "Manufacturing circuit boards",
            D: "Designing mechanical parts only"
        },

        correct: "A",

        explanation:
            "ROS 2 provides tools, libraries, communication mechanisms, and frameworks that help developers build complex robotic software."
    },


    {
        question: "What is SLAM used for in robotics?",

        options: {
            A: "Simultaneous localization and mapping",
            B: "Increasing motor voltage",
            C: "Programming LEDs",
            D: "Measuring battery temperature"
        },

        correct: "A",

        explanation:
            "SLAM stands for Simultaneous Localization and Mapping. A robot uses sensor information to build a map of an unknown environment while estimating its own position within that map."
    }

];


    let currentQuestion = 0;

    let score = 0;

    let answered = false;


    totalQuestions.textContent =
        questions.length;


    function showScreen(screen) {

        document
            .querySelectorAll(".quiz-screen")
            .forEach(s =>
                s.classList.remove("active")
            );

        screen.classList.add("active");

    }


    function loadQuestion() {

        answered = false;

        const q =
            questions[currentQuestion];


        questionNumber.textContent =
            currentQuestion + 1;


        questionText.textContent =
            q.question;


        answers.forEach(button => {

            const letter =
                button.dataset.answer;


            button.textContent =
                `${letter}. ${q.options[letter]}`;

            button.disabled = false;

        });


        showScreen(questionScreen);

    }


    function checkAnswer(selected) {

        if (answered) {
            return;
        }


        answered = true;


        const q =
            questions[currentQuestion];


        const isCorrect =
            selected === q.correct;


        if (isCorrect) {

            score++;

            resultIcon.textContent = "✓";

            resultTitle.textContent =
                "Correct!";

            resultMessage.textContent =
                "Good job!";

        }

        else {

            resultIcon.textContent = "✗";

            resultTitle.textContent =
                "Wrong!";

            resultMessage.textContent =
                "Not quite!";

        }


        explanation.textContent =
            q.explanation;


        correctAnswer.textContent =
            `${q.correct}. ${q.options[q.correct]}`;


        showScreen(result);

    }


    startButton.onclick = function() {

        currentQuestion = 0;

        score = 0;

        loadQuestion();

    };


    answers.forEach(button => {

        button.onclick = function() {

            checkAnswer(
                this.dataset.answer
            );

        };

    });


    nextButton.onclick = function() {

        currentQuestion++;


        if (
            currentQuestion >=
            questions.length
        ) {

            finalScore.textContent =
                `${score} / ${questions.length}`;


            if (score === questions.length) {

                finalLevel.textContent =
                    "Robotics Master 🤖";

            }
            else if (score >= 8) {

                finalLevel.textContent =
                    "Robotics Expert ⚙️";

            }
            else if (score >= 6) {

                finalLevel.textContent =
                    "Robotics Engineer 🔧";

            }
            else if (score >= 4) {

                finalLevel.textContent =
                    "Robotics Enthusiast 🚀";

            }
            else {

                finalLevel.textContent =
                    "Keep Learning 🤖";

            }


            showScreen(final);

        }

        else {

            loadQuestion();

        }

    };


    restartButton.onclick = function() {

        currentQuestion = 0;

        score = 0;

        loadQuestion();

    };


    showScreen(intro);

}


window.startRoboticsQuiz =
    startRoboticsQuiz;


if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startRoboticsQuiz
    );

}

else {

    startRoboticsQuiz();

}