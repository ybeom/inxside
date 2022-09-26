if (window.innerWidth < 1280) {
    let position = 0;
    let maxPos, imageWidth, start_x, end_x;
    if (window.innerWidth >= 768) {
        maxPos = 2;
        imageWidth = 600;
    } else {
        maxPos = 3;
        imageWidth = 320;
    }

    let curPos = maxPos;
    console.log(curPos);
    const loadmapImage = document.querySelector(".loadmap-image");
    loadmapImage.addEventListener("touchstart", touch_start);
    loadmapImage.addEventListener("touchend", touch_end);

    function prev() {
        if (curPos > 1) {
            if (position > 1200) {
                position = 1200;
            } else {
                position += imageWidth;
            }
            loadmapImage.style.transform = `translateX(${position}px)`;
            curPos -= 1;
        }
    }
    function next() {
        if (curPos < maxPos) {
            if (position < 0) {
                position = 0;
            } else {
                position -= imageWidth;
            }
            loadmapImage.style.transform = `translateX(${position}px)`;
            curPos += 1;
        }
    }
    function touch_start(e) {
        start_x = e.touches[0].pageX;
    }

    function touch_end(e) {
        end_x = e.changedTouches[0].pageX;
        if (start_x > end_x) {
            next();
        } else if (start_x < end_x) {
            prev();
        }
    }
}

//코멘트 폼 관련
const feelingBtnEl = document.querySelector(".comment-feeling-buttons-wrap");
const feelingInput = document.querySelector("#comment-form-feeling");
console.dir(feelingInput);

[].forEach.call(feelingBtnEl.children, function (el) {
    el.addEventListener("click", function (e) {
        console.log(e);
        //기존 클릭된 속성 제거
        const feelingButtons = document.querySelectorAll(".comment-feeling-buttons-wrap button");
        [].forEach.call(feelingButtons, function (el) {
            el.classList.remove("clicked");
            feelingInput.value = "";
        });
        //새롭게 속성 추가
        e.target.classList.add("clicked");
        feelingInput.value = e.target.value;
    });
});
