const targetDate = new Date('2023-10-09T17:00:00Z'); // Z at the end denotes UTC timezone


const movies = [
    { name: "Morningafter", duration: 218000 },
    { name: "Mikko_EVTEKtoAlaska", duration: 81000 },
    { name: "Museo_olohuoneena", duration: 173000 },
    { name: "opiskelijaelämää2009", duration: 206000 },
    { name: "Democompo", duration: 1188000 }
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
