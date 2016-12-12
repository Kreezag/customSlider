
function RunSlider (id, params = {}) {

    const ACTIVE_CLASS_CROP = 'b-slider__crop-item--active';
    const CURRENT_CLASS_CROP = 'b-slider__crop-item';
    const ADD_CLASS_CROP = ACTIVE_CLASS_CROP + " " + CURRENT_CLASS_CROP;

    let ACTIVE_CLASS_SLIDE = 'b-slider__slide--active';
    const CURRENT_CLASS_SLIDE = 'b-slider__slide';
    const ADD_CLASS_SLIDE = ACTIVE_CLASS_SLIDE + " " + ADD_CLASS_CROP;

    const sliderParams = {
        id: id,
        crops: Number(params.crops) === 0 ? 0 : 1,
        arrows: Number(params.arrows) === 0 ? 0 : 1,
        activeClass: params.activeClass ? params.activeClass : ACTIVE_CLASS_SLIDE,
        timeInterval: Number(params.timeInterval) ? params.timeInterval : 6000
    };

    const $slider = sliderParams.id;

    const $slide = $slider.getElementsByClassName(CURRENT_CLASS_SLIDE);
    const $crop = $slider.getElementsByClassName(CURRENT_CLASS_CROP);
    const $crops = $slider.getElementsByClassName('b-slider__crops');

    const $count = $slide.length;

    const $arl = $slider.getElementsByClassName('b-slider__arrow--left');
    const $arr = $slider.getElementsByClassName('b-slider__arrow--right');



    // /*
    // TODO сделать ядро слайдера с API и возможностью кастомизировать
    // (регулировать скорость мотания, добовлять управляющие элементы, имена классов и тд)
    // ряд дефолтных значений
    //
    // idElem : id;
    // activeClass : class;
    // controls : [el1, el2, el3] || el;
    // timeChangeSlide : time;
    // visible preview : boolean;
    // */
    //


    //************ Initialize slider ***********//

    function InitCrops (i) {
        const _el = document.createElement('span');

        _el.className = CURRENT_CLASS_CROP;
        _el.setAttribute('data-crop', i );
        $crops[0].appendChild(_el);

        if (!i) {
            _el.className = ADD_CLASS_CROP;
        }
    }



    function InitSlides (i) {
        $slide[i].setAttribute('data-slide', i );
    }



    function INIT_DATA_ATTR () {
        for (var _i = 0; _i < $count; _i++) {
            InitCrops(_i);
            InitSlides(_i);
        }
    }



    INIT_DATA_ATTR();



    //************ Action functions ***********//



    function SetActiveEl(e, pos, val = 0, currentClass) {
        var _addedClass = e[0].className ;

        // console.log(_addedClass);

        pos = Number(pos);
        val = Number(val);

        const getNextPos = () => {
            if (val > 0 && pos === ($count - 1)) {
                console.log('end');
                return 0;
            }

            if (val < 0 && pos == 0) {
                console.log('start');
                return ($count - 1);
            }

            console.log('normal');

            return (pos + val);
        };

        var nexPos = getNextPos();

        console.log(pos);
        // console.log(val);

        // console.log(nexPos);

        e[0].className = currentClass;
        e[nexPos].className = _addedClass;
    }


    function ChangeSlide (val = 0, pos = 0) {
        var curSlide = $slider.getElementsByClassName(ACTIVE_CLASS_SLIDE)[0];

        pos = pos ? pos : curSlide.getAttribute('data-slide');

        console.log(pos);
        console.log(curSlide.getAttribute('data-slide'));

        SetActiveEl($slide, pos, val, CURRENT_CLASS_SLIDE);
        // SetActiveEl($crop, pos, val, CURRENT_CLASS_CROP);
    }

    ChangeSlide();

    //************ Response functions ***********//

    $arl[0].onclick = () => {
        ChangeSlide(-1);
    };

    $arr[0].onclick = () => {
        ChangeSlide(1);
    };

    $crops[0].onclick = function(e) {
        const curPos = e.target.getAttribute('data-crop');

        if (curPos && curPos != $slide[0].getAttribute(ACTIVE_CLASS_SLIDE)) { //HUCK
            ChangeSlide(0, curPos);

            console.log(curPos);
        }
    };

    //
    // setTimeout( function Change() {
    //     ChangeSlide(1);
    //
    //     if ($arl.onclick && $arl.onclick && $crops.onclick) {
    //         setTimeout(Change(), 2000);
    //     }
    // }, 2000);

}

RunSlider(mainSlider);
