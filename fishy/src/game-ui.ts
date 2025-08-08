export class GameUI {
    public static showStatus(text: string) {
        const div = document.getElementById("status") as HTMLDivElement;
        div.style.display = "block";
        div.innerHTML = text;
    }

    public static hideStatus() {
        const div = document.getElementById("status") as HTMLDivElement;
        div.style.display = "none";
    }

    public static showScore(text: string) {
        const div = document.getElementById("score") as HTMLDivElement;
        div.style.display = "block";
        div.innerHTML = text;
    }

    public static hideScore() {
        const div = document.getElementById("score") as HTMLDivElement;
        div.style.display = "none";
    }
}