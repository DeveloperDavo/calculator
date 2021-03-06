'use strict';

describe("application", function () {
    var container, application;

    beforeEach(function () {
        container = fixture(
            '<div id="display">sample display</div>' +
            '<div id="history">sample history</div>' +
            '<button id="all-clear">AC</button>' +
            '<button id="clear-entry">CE</button>' +
            '<button class="operation" id="/" value="/">&#247;</button>' +
            '<button class="operation" id="*" value="*">&times;</button>' +
            '<button class="number" id="7">7</button>' +
            '<button class="number" id="8">8</button>' +
            '<button class="number" id="9">9</button>' +
            '<button class="operation" id="-" value="-">&minus;</button>' +
            '<button class="number" id="4">4</button>' +
            '<button class="number" id="5">5</button>' +
            '<button class="number" id="6">6</button>' +
            '<button class="operation" id="+" value="+">+</button>' +
            '<button class="number" id="1">1</button>' +
            '<button class="number" id="2">2</button>' +
            '<button class="number" id="3">3</button>' +
            '<button class="number" id="0">0</button>' +
            '<button id="decimal-point">.</button>' +
            '<button id="equals">=</button>'
        );
        document.body.appendChild(container);
        application = new Application(document);
    });

    afterEach(function () {
        document.body.removeChild(container);
    });


    it('should show 4 in history', function () {
        application.init();

        document.getElementById('4').click();

        expect(document.getElementById('history').textContent).toEqual('4');
    });

    it('should show 6 in history', function () {
        application.init();

        document.getElementById('6').click();

        expect(document.getElementById('history').textContent).toEqual('6');
    });

    it('should show multiple digits in history', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('0').click();

        expect(document.getElementById('history').textContent).toEqual('20');

    });

    it('should show 3 in display', function () {
        application.init();

        document.getElementById('3').click();

        expect(document.getElementById('display').textContent).toEqual('3');
    });

    it('should show 9 in display', function () {
        application.init();

        document.getElementById('9').click();

        expect(document.getElementById('display').textContent).toEqual('9');
    });

    it('should show multiple digits in display', function () {
        application.init();

        document.getElementById('7').click();
        document.getElementById('5').click();

        expect(document.getElementById('display').textContent).toEqual('75');

    });

    it('should show operation in history', function () {
        application.init();

        document.getElementById('8').click();
        document.getElementById('+').click();

        expect(document.getElementById('history').textContent).toEqual('8+');
    });


    it('should show operation in display', function () {
        application.init();

        document.getElementById('8').click();
        document.getElementById('+').click();

        expect(document.getElementById('display').textContent).toEqual('+');
    });

    it('should show multiple digits in display after operation', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();
        document.getElementById('0').click();

        expect(document.getElementById('display').textContent).toEqual('40');
    });


    it('should show result in history', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();
        document.getElementById('0').click();
        document.getElementById('/').click();
        document.getElementById('4').click();
        document.getElementById('equals').click();

        expect(document.getElementById('history').textContent).toEqual('2+40/4=12');
    });

    it('should show result in display', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();
        document.getElementById('0').click();
        document.getElementById('/').click();
        document.getElementById('4').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toEqual('12');
    });

    it('should replace existing operation with new one in history', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('/').click();
        document.getElementById('-').click();

        expect(document.getElementById('history').textContent).toEqual('2-');

    });

    it('should not replace existing operation with equals in history', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('/').click();
        document.getElementById('equals').click();

        expect(document.getElementById('history').textContent).toEqual('2/');

    });

    it('should show 0 in history upon initialisation', function () {
        application.init();

        expect(document.getElementById('history').textContent).toEqual('0');
    });

    it('should show 0 in display upon initialisation', function () {
        application.init();

        expect(document.getElementById('display').textContent).toEqual('0');
    });

    it('should show new number in history after equals operation', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();
        document.getElementById('equals').click();
        document.getElementById('1').click();

        expect(document.getElementById('history').textContent).toEqual('1');
    });

    it('should chain operation in history after result', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();
        document.getElementById('equals').click();

        expect(document.getElementById('history').textContent).toEqual('2+4=6');

        document.getElementById('+').click();
        document.getElementById('1').click();
        document.getElementById('equals').click();

        expect(document.getElementById('history').textContent).toEqual('6+1=7');
    });

    it('should show decimal number in history', function () {
        application.init();

        document.getElementById('decimal-point').click();
        document.getElementById('3').click();
        document.getElementById('-').click();
        document.getElementById('decimal-point').click();
        document.getElementById('1').click();

        expect(document.getElementById('history').textContent).toEqual('0.3-0.1');

    });

    it('should show decimal number in display', function () {
        application.init();

        document.getElementById('decimal-point').click();

        expect(document.getElementById('display').textContent).toEqual('0.');

        document.getElementById('3').click();
        document.getElementById('-').click();
        document.getElementById('decimal-point').click();
        document.getElementById('1').click();

        expect(document.getElementById('display').textContent).toEqual('0.1');
    });


    it('should limit input to 8 digits in display', function () {
        application.init();

        document.getElementById('1').click();
        document.getElementById('2').click();
        document.getElementById('3').click();
        document.getElementById('4').click();
        document.getElementById('5').click();
        document.getElementById('6').click();
        document.getElementById('7').click();
        document.getElementById('8').click();
        document.getElementById('9').click();
        document.getElementById('0').click();
        document.getElementById('1').click();

        expect(document.getElementById('display').textContent).toEqual('12345678');

    });

    it('should show last 15 chars in history when input is too large', function () {
        application.init();

        document.getElementById('1').click();
        document.getElementById('2').click();
        document.getElementById('3').click();
        document.getElementById('4').click();
        document.getElementById('5').click();
        document.getElementById('+').click();
        document.getElementById('7').click();
        document.getElementById('8').click();
        document.getElementById('9').click();
        document.getElementById('0').click();
        document.getElementById('-').click();
        document.getElementById('2').click();
        document.getElementById('3').click();
        document.getElementById('4').click();
        document.getElementById('/').click();
        document.getElementById('6').click();

        expect(document.getElementById('history').textContent).toEqual('...2345+7890-234/6');
    });

    it('should show results large than 7 digits rounded and in exponential notation in display', function () {
        application.init();

        document.getElementById('9').click();
        document.getElementById('0').click();
        document.getElementById('0').click();
        document.getElementById('0').click();
        document.getElementById('0').click();
        document.getElementById('0').click();
        document.getElementById('0').click();
        document.getElementById('+').click();
        document.getElementById('1').click();
        document.getElementById('2').click();
        document.getElementById('3').click();
        document.getElementById('4').click();
        document.getElementById('5').click();
        document.getElementById('6').click();
        document.getElementById('7').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toEqual('1e+7');
    });

    it('should show 0 in history when equals is clicked first', function () {
        application.init();

        document.getElementById('equals').click();

        expect(document.getElementById('history').textContent).toEqual('0');
    });

    it('should prepend 0 to history when operation is clicked first', function () {
        application.init();

        document.getElementById('-').click();
        document.getElementById('3').click();
        document.getElementById('equals').click();

        expect(document.getElementById('history').textContent).toBe('0-3=-3');

    });

    it('should show 0 in history after clicking clear all', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('/').click();
        document.getElementById('3').click();
        document.getElementById('all-clear').click();

        expect(document.getElementById('history').textContent).toBe('0');
    });

    it('should show 0 in display after clicking clear all', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('/').click();
        document.getElementById('3').click();
        document.getElementById('all-clear').click();

        expect(document.getElementById('display').textContent).toBe('0');
    });

    it('should show new equation in history after clearing all', function () {
        application.init();

        document.getElementById('all-clear').click();
        document.getElementById('+').click();
        document.getElementById('7').click();
        document.getElementById('equals').click();

        expect(document.getElementById('history').textContent).toBe('0+7=7');

    });

    it('should show previous number in history when clicking clear entry on an operation', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('/').click();
        document.getElementById('clear-entry').click();

        expect(document.getElementById('history').textContent).toBe('2');

        document.getElementById('-').click();
        document.getElementById('3').click();
        document.getElementById('equals').click();

        expect(document.getElementById('history').textContent).toBe('2-3=-1');
    });

    it('should show previous number in display when clicking clear entry on an operation', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('/').click();
        document.getElementById('clear-entry').click();

        expect(document.getElementById('display').textContent).toBe('2');
    });

    it('should show previous history when clicking clear entry on a number', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('2').click();
        document.getElementById('0').click();
        document.getElementById('clear-entry').click();

        expect(document.getElementById('history').textContent).toBe('2+');

        document.getElementById('4').click();
        document.getElementById('0').click();
        document.getElementById('equals').click();

        expect(document.getElementById('history').textContent).toBe('2+40=42');
    });

    it('should show 0 in history after clicking on clear entry at the beginning', function () {
        application.init();

        document.getElementById('clear-entry').click();
        expect(document.getElementById('history').textContent).toBe('0');

    });

    it('should show 0 in display after clicking on clear entry after result', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('-').click();
        document.getElementById('3').click();
        document.getElementById('equals').click();
        document.getElementById('clear-entry').click();

        expect(document.getElementById('display').textContent).toBe('0');
    });

    it('should show correct result in history after negative result', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('-').click();
        document.getElementById('3').click();
        document.getElementById('equals').click();
        document.getElementById('+').click();
        document.getElementById('2').click();
        document.getElementById('equals').click();

        expect(document.getElementById('history').textContent).toBe('-1+2=1');
    });

    it('should show consecutive decimal points once in history', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('decimal-point').click();
        document.getElementById('decimal-point').click();

        expect(document.getElementById('history').textContent).toBe('2.');
    });

    it('should not allow a decimal point as the last if chars in display is one less than max', function () {
        application.init();

        document.getElementById('1').click();
        document.getElementById('2').click();
        document.getElementById('3').click();
        document.getElementById('4').click();
        document.getElementById('5').click();
        document.getElementById('6').click();
        document.getElementById('7').click();
        document.getElementById('decimal-point').click();

        expect(document.getElementById('history').textContent).toBe('1234567');
    });

    it('should append 0 to history if decimal is clicked before an operation', function () {
        application.init();

        document.getElementById('1').click();
        document.getElementById('decimal-point').click();
        document.getElementById('+').click();

        expect(document.getElementById('history').textContent).toBe('1.0+');
    });

    it('should append 0 to history if decimal is clicked before an equals', function () {
        application.init();

        document.getElementById('1').click();
        document.getElementById('+').click();
        document.getElementById('1').click();
        document.getElementById('decimal-point').click();
        document.getElementById('equals').click();

        expect(document.getElementById('history').textContent).toBe('1+1.0=2');
    });

});

function fixture(html) {
    var div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}
