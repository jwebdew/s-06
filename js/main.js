$(function () {
    //fullpage
    //graphic design animation
    let designImgs = $(".work02 .list ul li img");

    var myFullpage = new fullpage("#fullpage", {
        /* sectionsColor: [
          "#1bbc9b",
          "#4BBFC3",
          "#7BAABE",
          "whitesmoke",
          "#ccddff",
        ], */
        anchors: ["home", "skill", "about", "work", "design", "contact"],
        navigation: true,
        navigationTooltips: [
            "HOME",
            "SKILL",
            "ABOUT",
            "WEB",
            "DESIGN",
            "CONTACT",
        ],
        showActiveTooltip: true,
        menu: "#menu",
        onScrollOverflow: function (section, slide, position, direction) {
            designImgs.each(function (item, index) {
                //index가 각 이미지
                let designImgTop = $(index).offset().top;

                /*     console.log(designImgTop); */
                if (designImgTop - 2500 <= position) {
                    $(index).addClass("active");
                } /* else{
                    $(index).removeClass("active");
                } */
            });
        },
    });

    //modal
    let modal = $(".modal");
    let cancelModalBtn = $(".modal .cancel--icon");

    cancelModalBtn.click(function () {
        $("body").removeClass("on");
        modal.removeClass("on");
    });

    //modal coming out
    modal.animate(
        {
            top: "50%",
        },
        700,
        "swing"
    );

    let modalBtn = $(".modal button");
    let modalImg = $(".modal--img");

    //click button
    for (let i = 0; i < modalBtn.length; i++) {
        modalBtn[i].addEventListener("click", () => {
            modalImg
                .eq(i)
                .find("figure")
                .animate({ width: "70%" }, 1000, "swing");
        });
        modalImg[i].addEventListener("click", () => {
            modalImg.find("figure").animate({ width: "0" }, 1000, "swing");
        });
    }
    //modal end

    //cursor effect
    let x1 = 0,
        y1 = 0;
    window.client;
    const vh = Math.max(
            document.documentElement.clientHeight || 0,
            window.innerHeight || 0
        ),
        dist_to_draw = 50,
        delay = 1000,
        fsize = ["1.1rem", "1.4rem", ".8rem", "1.7rem"],
        colors = [
            "#E23636",
            "#F9F3EE",
            "#E1F8DC",
            "#B8AFE6",
            "#AEE1CD",
            "#5EB0E5",
        ],
        rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
        selRand = (o) => o[rand(0, o.length - 1)],
        distanceTo = (x1, y1, x2, y2) =>
            Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
        shouldDraw = (x, y) => distanceTo(x1, y1, x, y) >= dist_to_draw,
        addStr = (x, y) => {
            const str = document.createElement("div");
            str.innerHTML = "&#10022;";
            str.className = "star";
            str.style.top = `${y + rand(-20, 20)}px`;
            str.style.left = `${x}px`;
            str.style.color = selRand(colors);
            str.style.fontSize = selRand(fsize);
            document.body.appendChild(str);
            //console.log(rand(0, 3));
            const fs = 10 + 5 * parseFloat(getComputedStyle(str).fontSize);
            //console.log(vh, y, fs);
            //console.log((y+fs)>vh?vh-y:fs);
            str.animate(
                {
                    translate: `0 ${y + fs > vh ? vh - y : fs}px`,
                    opacity: 0,
                    transform: `rotateX(${rand(1, 500)}deg) rotateY(${rand(
                        1,
                        500
                    )}deg)`,
                },
                {
                    duration: delay,
                    fill: "forwards",
                }
            );
            //could add a animation terminate listener, but why add the additional load
            setTimeout(() => {
                str.remove();
            }, delay);
        };

    addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        if (shouldDraw(clientX, clientY)) {
            addStr(clientX, clientY);
            x1 = clientX;
            y1 = clientY;
        }
    });

    //mainvisual typing

    var typingBool = false;
    var typingIdx = 0;
    var liIndex = 0;
    var liLength = $(".typing-txt li").length;

    // 타이핑될 텍스트를 가져온다
    var typingTxt = $(".typing-txt li").eq(liIndex).text();
    typingTxt = typingTxt.split(""); // 한글자씩 자른다.
    if (typingBool == false) {
        // 타이핑이 진행되지 않았다면
        typingBool = true;
        var tyInt = setInterval(typing, 100); // 반복동작
    }

    function typing() {
        if (typingIdx < typingTxt.length) {
            // 타이핑될 텍스트 길이만큼 반복
            $(".typing").append(typingTxt[typingIdx]); // 한글자씩 이어준다.
            typingIdx++;
        } else {
            //한문장이끝나면
            //다음문장으로.. 마지막문장이면 다시 첫번째 문장으로
            if (liIndex >= liLength - 1) {
                liIndex = 0;
            } else {
                liIndex++;
            }

            //다음문장을 타이핑하기위한 셋팅
            typingIdx = 0;
            typingBool = false;
            typingTxt = $(".typing-txt li").eq(liIndex).text();

            //다음문장 타이핑전 1초 쉰다
            clearInterval(tyInt);
            setTimeout(function () {
                $(".typing").html("");
                tyInt = setInterval(typing, 100);
            }, 1000);
        }
    } //mainvisual typing end

    //skill icon click
    let skillDes = document.querySelectorAll(".skill__des p");
    let skillIcon = document.querySelectorAll(".skill__des--icon li");
    for (let i = 0; i < skillIcon.length; i++) {
        skillIcon[i].addEventListener("click", () => {
            skillDes.forEach((item) => {
                item.classList.remove("on");
            });
            skillDes[i].classList.add("on");
        });
    } //icon click end

    //about
    //showing img
    anime
        .timeline({ loop: true })
        .add({
            targets: ".ml8 .circle-white",
            scale: [0, 3],
            opacity: [1, 0],
            easing: "easeInOutExpo",
            rotateZ: 360,
            duration: 1100,
        })
        .add({
            targets: ".ml8 .circle-container",
            scale: [0, 1],
            duration: 1100,
            easing: "easeInOutExpo",
            offset: "-=1000",
        })
        .add({
            targets: ".ml8 .circle-dark",
            scale: [0, 1],
            duration: 1100,
            easing: "easeOutExpo",
            offset: "-=600",
        })
        .add({
            targets: ".ml8 .letters-left",
            scale: [0, 1],
            duration: 1200,
            offset: "-=550",
        })
        .add({
            targets: ".ml8 .bang",
            scale: [0, 1],
            rotateZ: [45, 15],
            duration: 1200,
            offset: "-=1000",
        })
        .add({
            targets: ".ml8",
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1400,
        });

    anime({
        targets: ".ml8 .circle-dark-dashed",
        rotateZ: 360,
        duration: 8000,
        easing: "linear",
        loop: true,
    });

    //graphic design tap menu
    let designTapMenu = document.querySelectorAll(".work02 ul li button");
    let designList = document.querySelectorAll(".work02 .list");

    for (let i = 0; i < designTapMenu.length; i++) {
        designTapMenu[i].addEventListener("click", () => {
            designList.forEach((item) => {
                item.classList.remove("on");
            });
            designList[i].classList.add("on");
        });
    }

    //contact
});
