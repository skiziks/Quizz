const quizData = [
    {
        question: "La surconsommation des réseaux sociaux peut entraîner une diminution de la communication face à face.",
        correctAnswer: true,
        explanation: "Lorsque les individus passent trop de temps sur les réseaux sociaux, ils ont tendance à négliger les interactions en personne, ce qui peut conduire à une diminution de la communication face à face. Cela peut avoir un impact négatif sur les relations interpersonnelles et l'établissement de liens significatifs."
    },
    {
        question: "La surconsommation des réseaux sociaux peut entraîner une dépendance sociale.",
        correctAnswer: false,
        explanation: "L'utilisation excessive des réseaux sociaux peut créer une dépendance sociale, où les individus ont constamment besoin de validation et d'attention en ligne. Cette dépendance peut nuire aux relations réelles, car les personnes peuvent avoir du mal à se connecter authentiquement avec les autres en dehors du monde virtuel."
    },
    {
        question: "La surconsommation des réseaux sociaux peut entraîner une diminution de la productivité.",
        correctAnswer: true,
        explanation: "L'utilisation excessive des réseaux sociaux peut entraîner une diminution de la productivité, car les individus peuvent passer plus de temps à naviguer sur les réseaux sociaux qu'à travailler ou à faire des tâches importantes."
    },
    {
        question: "La surconsommation des réseaux sociaux peut entraîner une diminution de la qualité du sommeil.",
        correctAnswer: true,
        explanation: "L'utilisation excessive des réseaux sociaux peut entraîner une diminution de la qualité du sommeil, car les individus peuvent passer plus de temps à naviguer sur les réseaux sociaux qu'à dormir. De plus, la lumière bleue émise par les écrans peut perturber le rythme circadien, ce qui peut entraîner des problèmes de sommeil."
    },
    {
        question: "La surconsommation des réseaux sociaux peut entraîner une diminution de l'estime de soi.",
        correctAnswer: true,
        explanation: "L'utilisation excessive des réseaux sociaux peut entraîner une diminution de l'estime de soi, car les individus peuvent se comparer aux autres en ligne et se sentir mal à l'aise avec leur propre vie. De plus, les individus peuvent se sentir mal à l'aise avec leur propre corps en raison de la pression sociale pour avoir un corps parfait."
    },
];

const quizDataFinish = [
    {
        expert: "Vous avez un très bon niveau de connaissances sur les réseaux sociaux. Continuez à vous informer sur les réseaux sociaux et leurs effets sur la santé mentale et surtout faites en part à votre entourage pour les sensibiliser.",
        avance: "Vous avez un bon niveau de connaissances sur les réseaux sociaux. Continuez à vous informer sur les réseaux sociaux et leurs effets sur la santé mentale.",
        intermediaire: "Vous avez un niveau de connaissances moyen sur les réseaux sociaux. Continuez à vous informer sur les réseaux sociaux et leurs effets sur la santé mentale.",
        debutant: "Vous avez un faible niveau de connaissances sur les réseaux sociaux. Continuez à vous informer sur les réseaux sociaux et leurs effets sur la santé mentale.",
        noob: "Vous avez un très faible niveau de connaissances sur les réseaux sociaux. Continuez à vous informer sur les réseaux sociaux et leurs effets sur la santé mentale."
    }
]

const questionElement = document.getElementById("question");
const trueBtn = document.getElementById("true-btn");
const falseBtn = document.getElementById("false-btn");
const explanationElement = document.getElementById("explanation");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    explanationElement.textContent = "";
    explanationElement.style.display = "none";
    trueBtn.classList.remove("correct", "incorrect");
    falseBtn.classList.remove("correct", "incorrect");
    nextBtn.disabled = true;
}

function checkAnswer(isTrue) {
    if (isTrue === true) {
        var Breponse = trueBtn;
        var Mreponse = falseBtn;
    }
    else {
        var Breponse = falseBtn;
        var Mreponse = trueBtn;
    }
    const currentQuestion = quizData[currentQuestionIndex];

    if (isTrue === currentQuestion.correctAnswer) {
        score++;
        explanationElement.textContent = "Bonne réponse ! " + currentQuestion.explanation;
        Breponse.classList.add("correct");
    } else {
        explanationElement.textContent = "Mauvaise réponse. " + currentQuestion.explanation;
        Breponse.classList.add("incorrect");
        Mreponse.classList.add("correct");
    }

    explanationElement.style.display = "block";
    trueBtn.disabled = true;
    falseBtn.disabled = true;
    nextBtn.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        trueBtn.disabled = false;
        falseBtn.disabled = false;
        nextBtn.disabled = true;
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    questionElement.textContent = "Quiz terminé !";
    explanationElement.textContent = "Votre score : " + score + "/" + quizData.length;
    var result = score / quizData.length;
    switch (true) {
        case (result >= 1):
            explanationElement.textContent += "\n" + quizDataFinish[0].expert;
            break;
        case (result >= 0.75):
            explanationElement.textContent += "\n" + quizDataFinish[0].avance;
            break;
        case (result >= 0.5):
            explanationElement.textContent += "\n" + quizDataFinish[0].intermediaire;
            break;
        case (result >= 0.25):
            explanationElement.textContent += "\n" + quizDataFinish[0].debutant;
            break;
        default:
            explanationElement.textContent += "\n" + quizDataFinish[0].noob;
            break;
    }
    
    // if (score == quizData.length) {
    //     explanationElement.textContent += "\n" + quizDataFinish[0].expert;
    // }
    trueBtn.style.display = "none";
    falseBtn.style.display = "none";
    nextBtn.style.display = "none";
    explanationElement.style.display = "block";
}

trueBtn.addEventListener("click", function() {
    checkAnswer(true);
});

falseBtn.addEventListener("click", function() {
    checkAnswer(false);
});

nextBtn.addEventListener("click", nextQuestion);

loadQuestion();
