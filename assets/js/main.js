const loadmapEl = document.querySelector(".loadmap");
const loadmapImageEl = document.querySelector(".loadmap-image");

const htmlEl = document.querySelector("html");
const containerEl = document.querySelector(".container");

if (loadmapEl) {
    if (window.innerWidth < 1280 && window.innerWidth > 700) {
        loadmapEl.scrollLeft = 600;
    } else if (window.innerWidth < 700) {
        loadmapEl.scrollLeft = 700;
    }
}

// 슬라이딩 방식 아카이브
// if (loadmapImage) {
//     if (window.innerWidth < 1280) {
//         let position = 0;
//         let maxPos, imageWidth, start_x, end_x;
//         if (window.innerWidth >= 768) {
//             maxPos = 2;
//             imageWidth = 600;
//         } else {
//             maxPos = 3;
//             imageWidth = 320;
//         }

//         let curPos = maxPos;
//         loadmapImage.addEventListener("touchstart", touch_start);
//         loadmapImage.addEventListener("touchend", touch_end);

//         function prev() {
//             if (curPos > 1) {
//                 if (position > 1200) {
//                     position = 1200;
//                 } else {
//                     position += imageWidth;
//                 }
//                 loadmapImage.style.transform = `translateX(${position}px)`;
//                 curPos -= 1;
//             }
//         }
//         function next() {
//             if (curPos < maxPos) {
//                 if (position < 0) {
//                     position = 0;
//                 } else {
//                     position -= imageWidth;
//                 }
//                 loadmapImage.style.transform = `translateX(${position}px)`;
//                 curPos += 1;
//             }
//         }
//         function touch_start(e) {
//             start_x = e.touches[0].pageX;
//         }

//         function touch_end(e) {
//             end_x = e.changedTouches[0].pageX;
//             if (start_x > end_x) {
//                 next();
//             } else if (start_x < end_x) {
//                 prev();
//             }
//         }
//     }
// }

//코멘트 폼 관련
const feelingBtnEl = document.querySelector(".comment-feeling-buttons-wrap");
const feelingInput = document.querySelector("#comment-form-feeling");
if (feelingBtnEl) {
    [].forEach.call(feelingBtnEl.children, function (el) {
        el.addEventListener("click", function (e) {
            //기존 클릭된 속성 제거
            const feelingButtons = document.querySelectorAll(".comment-feeling-buttons-wrap button");
            [].forEach.call(feelingButtons, function (e) {
                e.classList.remove("clicked");
            });
            //새롭게 속성 추가
            e.target.classList.add("clicked");
            feelingInput.value = e.target.value;
        });
    });
}

//갤러리 가로 스크롤
const galleryContainerEl = document.querySelector(".gallery-container");
const galleryWrapEl = document.querySelector(".gallery-wrap");

if (galleryContainerEl) {
    const sliderWidth = galleryWrapEl.offsetWidth;
    let moveX = 0;
    let moveY = 0;

    htmlEl.addEventListener("wheel", function (e) {
        moveY += e.deltaY;

        if (moveY <= sliderWidth) {
            moveX += e.deltaY;
            galleryContainerEl.scrollLeft += e.deltaY;

            containerEl.classList.add("container-fixed");
        } else {
            containerEl.classList.remove("container-fixed");
        }
    });
}

const feelingFilterEl = document.querySelector(".feeling-filter");

if (feelingFilterEl) {
    const artCommentEls = document.querySelectorAll(".art-comment");
    const allFeelingBtnEl = document.querySelector(".all");

    [].forEach.call(feelingFilterEl.children, function (el) {
        el.addEventListener("click", (e) => {
            if (e.target.classList.contains("all")) {
                //button control
                [].forEach.call(feelingFilterEl.children, (el) => {
                    el.classList.add("unclicked");
                });
                e.target.classList.remove("unclicked");
                //review card control
                [].forEach.call(artCommentEls, (el) => {
                    el.classList.remove("hidden");
                });
            } else if (e.target.classList.contains("unclicked")) {
                //button control
                e.target.classList.remove("unclicked");
                //review card control
                if (allFeelingBtnEl.classList.contains("unclicked")) {
                    [].forEach.call(artCommentEls, (el) => {
                        if (el.classList.contains(e.target.value)) {
                            el.classList.remove("hidden");
                        }
                    });
                } else {
                    allFeelingBtnEl.classList.add("unclicked");
                    [].forEach.call(artCommentEls, (el) => {
                        if (!el.classList.contains(e.target.value)) {
                            el.classList.add("hidden");
                        }
                    });
                }
            } else {
                //button control
                e.target.classList.add("unclicked");
                //review card control
                [].forEach.call(artCommentEls, (el) => {
                    if (el.classList.contains(e.target.value)) {
                        el.classList.add("hidden");
                    }
                });
                let isAllHidden = true;
                let isAllUnclicked = true;

                [].forEach.call(artCommentEls, (el) => {
                    isAllHidden = isAllHidden && el.classList.contains("hidden");
                });
                [].forEach.call(feelingFilterEl.children, (el) => {
                    isAllUnclicked = isAllUnclicked && el.classList.contains("unclicked");
                });
                if (isAllHidden && isAllUnclicked) {
                    //button control
                    allFeelingBtnEl.classList.remove("unclicked");
                    //review card control
                    [].forEach.call(artCommentEls, (el) => {
                        el.classList.remove("hidden");
                    });
                }
            }
        });
    });
}
