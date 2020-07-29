const alpha = "abcdefghijklmnopqrstuvwxyz";
const len = alpha.length - 1;
$(document).ready(function () {
    let spc = $("#spc");
    let total = $("#total-chars");
    let btn = $("#init-button");
    let stats = $("#stats");
    let accuracy = $("#accuracy");

    function clear() {
        spc.val("");
        total.val("");
    }

    function enable_btn() {
        btn.prop('disabled', true);
    }

    function disable_btn() {
        btn.prop('disabled', false);
    }

    function click_sound() {
        let click_audio = new Audio("click.mp3");
        click_audio.play();
    }

    function wrong_sound() {
        let wrong_audio = new Audio("wrong.mp3");
        wrong_audio.play();
    }
    function finished_sound() {
        let finished_audio = new Audio("finished.mp3");
        finished_audio.play();
    }
    function random_letter() {
        return alpha[Math.round(Math.random() * len)];
    }
    function wpm_to_cpm(wpm) {
        return wpm * 5;
    }
    function cpm_to_wpm(cpm) {
        return cpm / 5;
    }
    function ms_to_min(ms) {
        return ms / 60000;
    }
    function print_stats(diff, total, correct) {
        let wpm = (cpm_to_wpm(total) / ms_to_min(diff)).toFixed(1);
        stats.text(wpm);
        accuracy.text(Math.round(correct / (total) * 100));
    }
    function practice() {
        let total_val = Number(total.val()) - 1;
        let current = $("#current");
        let next = $("#next");
        let chars = [];
        let cnt = 0;
        let start, end;
        let correct = 0;
        clear();

        for (let i = 0; i <= total_val; i++) {
            chars.push(random_letter());
        }
        let current_letter = chars[cnt];
        let next_letters = chars.slice(cnt + 1, Math.min(cnt + 7, total_val + 1)).join("   ");
        current.text(current_letter);
        next.text(next_letters);

        $(document).keypress(function (e) {
            let letter = String.fromCharCode(e.charCode);
            if (letter == current_letter) {
                if (cnt == 0) {
                    start = Date.now();
                }
                else if (cnt == total_val) {
                    end = Date.now();
                    finished_sound();
                    print_stats(end - start, total_val, correct);
                    current.text("");
                    next.text("");
                    chars = [];
                    cnt = 0;
                    $(document).unbind("keypress");
                }

                click_sound();
                correct++;
                cnt++;
                current_letter = chars[cnt];
                next_letters = chars.slice(cnt + 1, Math.min(cnt + 5, total_val + 1)).join("   ");
                current.text(current_letter);
                next.text(next_letters);
            }
            else {
                correct--;
                wrong_sound();
            }
        });
    }
    btn.click(practice);
});

