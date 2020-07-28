function wpm_to_cpm(wpm) {
    return wpm * 5;
}
const alpha = "abcdefghijklmnopqrstuvwxyz";
const len = alpha.length;
$(document).ready(function () {
    let spc = $("#spc");
    let total = $("#total-chars");
    let btn = $("#init-button");

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
    function random_letter() {
        return alpha[Math.round(Math.random() * len)];
    }
    function practice() {
        let total_val = Number(total.val()) - 1;
        let current = $("#current");
        let next = $("#next");
        let chars = [];
        let cnt = 0;
        clear();

        for (let i = 0; i <= total_val; i++) {
            chars.push(random_letter());
        }
        console.log(chars);
        let current_letter = chars[cnt];
        let next_letters = chars.slice(cnt + 1, Math.min(cnt + 5, total_val)).join("   ");
        current.text(current_letter);
        next.text(next_letters);

        $(document).keypress(function (e) {
            let letter = String.fromCharCode(e.charCode);
            if (letter == current_letter) {
                if (cnt == total_val) {
                    current.text("");
                    next.text("");
                    alert("BRRR");
                }

                click_sound();
                cnt++;
                current_letter = chars[cnt];
                next_letters = chars.slice(cnt + 1, cnt + 5).join("    ");
                current.text(current_letter);
                next.text(next_letters);
            }
            else {
                wrong_sound();
            }
        });
    }

    btn.click(practice);
});

