const targetDate = new Date('2023-10-11T09:00:00');

const movies = [
    { name: "Die Hard", duration: 115000 },
    { name: "Uuno Espanjassa", duration: 236000 },
    { name: "Terminator", duration: 82000 },
    { name: "Kulkurin Valssi", duration: 172000 },
    { name: "Scarface", duration: 43000 }
];

let currentMovieIndex = 0;

const playNextMovie = () => {
    if (currentMovieIndex >= movies.length) {
        document.getElementById('display').innerText = "Thank you for participating!";
        return;
    }

    const movie = movies[currentMovieIndex];
    document.getElementById('display').innerText = `Now Playing: ${movie.name}`;

    setTimeout(() => {
        currentMovieIndex++;
        playNextMovie();
    }, movie.duration);
}

const countdownTo = (targetDate) => {
    const timeDifference = targetDate - new Date();
    if (timeDifference <= 0) return null;

    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
}

const startCountdown = () => {
    const interval = setInterval(() => {
        const timeLeft = countdownTo(targetDate);
        if (!timeLeft) {
            clearInterval(interval);
            playNextMovie();
        } else {
            document.getElementById('display').innerText = `Starting in: ${timeLeft}`;
        }
    }, 1000);
}

startCountdown();
