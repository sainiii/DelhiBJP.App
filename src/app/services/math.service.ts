import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class MathService {

    public answer: string = '</br></br>Hence, the correct answer is ';
    constructor(private router: Router) { }
    //===============================================Generic Methood==================================================

    //Generate Random Number Here
    getRandomNumInRangeInc(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //Generate Random Fraction Here
    getRandomFractionsInRange(min: number, max: number, fractionLimit: number) {
        return parseFloat((Math.random() * (max - min + 1) + min).toFixed(fractionLimit));
    }

    //Generate Random Number But Not What we have
    generateRandomNonZeroNumber(min: number, max: number, remove: any): number {
        var num = Math.floor(Math.random() * (max - min + 1)) + min;
        return (num === remove) ? this.generateRandomNonZeroNumber(min, max, remove) : num;
    }

    //Generate Random Fraction But Not What we have
    getRandomFractionException(min: number, max: number, fractionLimit: number, remove: any): any {
        var num = parseFloat((Math.random() * (max - min + 1) + min).toFixed(fractionLimit));
        return (num === remove) ? this.getRandomFractionException(min, max, fractionLimit, remove) : num;
    }

    //Generates Random Small Alphabets
    generateRandomSmallAlphabet(random: string) {
        var alphabet = "abcdefghijklmnopqrstuvwxyz";
        var getRandomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        var randomLetter = getRandomLetter;
        return randomLetter;
    }
    //Generates Random Capital Alphabets
    generateRandomCapitalAlphabet(random: string) {
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var getRandomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        var randomLetter = getRandomLetter;
        return randomLetter;
    }
    getRandomFloat(min: any, max: any, pre: any) {
        var rand = Math.random() * (max - min) + min;
        var power = Math.pow(10, pre);
        return Math.floor(rand * power) / power;
    }
    // Get Diff. Random Element From Array
    getRandomDiffElement(array: any, last: any): any {
        let value = array[Math.floor(Math.random() * array.length)];
        return (value === last) ? this.getRandomDiffElement(array, last) : value;
    }

    getDivisor(dividend: number) {
        //min = Math.floor(Math.random() * (dividend - min + 1)) + min;
        let divisorsArray = [];

        for (let i = 1; i <= dividend; i++) {
            if (dividend % i == 0) {
                divisorsArray.push([i, dividend / i]);
            }
        }
        return divisorsArray;
    }

    getDivisibleNumber(min: any, max: any, number: any, divisor: any) {
        while (number % divisor !== 0) {
            number = this.getRandomNumInRangeInc(min, max);
        }
        return number;
    }

    getMultiples(min: any, max: any, divisor: any) {
        return Math.round((Math.random() * (max - min) + min) / divisor) * divisor;
    }

    //Generate option Array with Array Size
    GenrateOptions(min: number, max: number, ArraySize: number) {
        let list = [];
        let i: number = 1;
        for (i; i <= ArraySize; i++) {
            list.push(this.getRandomNumInRangeInc(min, max));
        }
        return list;
    }
    // Get Number DIvisible by Num1 and Num2
    getDivisibleNumberByTwo(min: number, max: number, num: number, divisor1: number, divisor2: number): any {
        if (num % divisor1 === 0) {
            if (num % divisor2 === 0) {
                return num;
            }
        }
        num = this.getRandomNumInRangeInc(min, max);
        return this.getDivisibleNumberByTwo(min, max, num, divisor1, divisor2);
    }

    lcm_two_numbers(x: any, y: any) {
        return (!x || !y) ? 0 : Math.abs((x * y) / this.gcd_two_numbers(x, y));
    }

    gcd_two_numbers(x: any, y: any) {
        x = Math.abs(x);
        y = Math.abs(y);
        while (y) {
            var t = y;
            y = x % y;
            x = t;
        }
        return x;
    }

    //LCM of three numbers
    LCM_Of_Three_Numbers(x: number, y: number, z: number) {
        let max, lcom, count, flag = 0;
        if (x >= y && x >= z)
            max = x;
        else if (y >= x && y >= z)
            max = y;
        else if (z >= x && z >= y)
            max = z;
        for (count = 1; flag == 0; count++) {
            lcom = max! * count;
            if (lcom % x == 0 && lcom % y == 0 && lcom % z == 0) {
                flag = 1;
            }
        }
        return lcom;
    }

    // reduce two numbers to a smaller number
    // reduce a fraction
    reduce(numerator: number, denominator: number) {
        if (isNaN(numerator) || isNaN(denominator)) return NaN;
        var gcd: any = function gcd(a: number, b: number): any {
            return b ? gcd(b, a % b) : a;
        };
        gcd = gcd(numerator, denominator);
        return [numerator / gcd, denominator / gcd];
    }
    getNonDivisibleNumbers(min: number, max: number, descending: boolean = false): any {
        let n1: number, n2: number, num: number[];
        n1 = this.generateRandomNonZeroNumber(min, max, 0);
        n2 = this.genArrayBasedUniqueNumbers(min, max, [n1, 0], 1)[0];
        if (descending === true) {
            if (n1 < n2) {
                return this.getNonDivisibleNumbers(min, max, descending);
            }
            else {
                if (n1 % n2 === 0 || n2 % n1 === 0) {
                    return this.getNonDivisibleNumbers(min, max, descending);
                }
                else {
                    return this.reduce(n1, n2);
                }
            }
        }
        else {
            if (n1 > n2) {
                return this.getNonDivisibleNumbers(min, max, descending);
            }
            else {
                if (n1 % n2 === 0 || n2 % n1 === 0) {
                    return this.getNonDivisibleNumbers(min, max, descending);
                }
                else {
                    return this.reduce(n1, n2);
                }
            }
        }
    }
    // Generate option array with array size and without repeating options
    GenrateOptionsWithoutRepeat(min: number, max: number, ArraySize: number) {
        let list = [];
        while (list.length < ArraySize) {
            var r = Math.floor(Math.random() * (max - min + 1) + min);
            if (list.indexOf(r) === -1) list.push(r);
        }
        return list;
    }
    //Generate decimal options without repeating
    GenrateDecimalOptionsWithoutRepeat(min: number, max: number, pre: number, ArraySize: number) {
        let list = [];
        while (list.length < ArraySize) {
            //var r = Math.floor(Math.random() * (4 - 1 - 0 + 1) + 0);
            var rand = Math.random() * (max - min) + min;
            var power = Math.pow(10, pre);
            let result = Math.floor(rand * power) / power;
            if (list.indexOf(result) === -1) list.push(result);
        }
        return list;
    }
    // Generate unique numbers that are not in the array
    genArrayBasedUniqueNumbers(min: any, max: any, array: any, length: any) {
        var arr = [];

        if (length > (max - min)) {
            //return new Error('length can not be greater than the difference of max and min');

            length = (max - min);
        }

        while (arr.length < length) {
            var r = Math.floor(Math.random() * (max - min + 1)) + min;
            if (array.indexOf(r) === -1) {
                if (arr.indexOf(r) === -1) {
                    arr.push(r);
                }
            }
        }
        return arr;
    }

    getCalculatedRoot(num: any, root: number = 2) {
        let number = num;

        for (let i = 1; i < root; i++) {
            number *= num;
        }

        return number;
    }

    shuffle(a: any) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    //==============ConvertFromNumberToWords=====================
    numToWords(n: number, s: string): string {
        let str = "";
        let one: string[] = new Array(" ", "one ", "two ", "three ", "four ", "five ", "six ", "seven ", "eight ", "nine ", "ten ", "eleven ", "twelve ", "thirteen ", "fourteen ", "fifteen ", "sixteen ", "seventeen ", "eighteen ", "nineteen ");
        let ten: string[] = new Array(" ", " ", "twenty ", "thirty ", "forty ", "fifty ", "sixty ", "seventy ", "eighty ", "ninety ");
        if (n > 19) {
            let n1 = Math.floor(n / 10);
            let n2 = Math.floor(n % 10);
            str += ten[n1] + one[n2];
        }
        else if (n >= 10) {
            str += one[n];
        }
        else {
            let n3 = Math.floor(n % 10);
            str += one[n3];
        }
        // if n is non-zero 
        if (n)
            str += s;
        //  console.log(str);
        return str;
    }
    // Function to print a given number in words 
    convertToWords(n: number): string {
        let out = '';
        if (Math.floor((n / 10000000) % 10) != 0)
            out += this.numToWords(Math.floor(n / 10000000), "crore ");
        if (Math.floor((n / 100000) % 100) != 0)
            out += this.numToWords(Math.floor((n / 100000) % 100), "lakh ");
        if (Math.floor((n / 1000) % 100) != 0)
            out += this.numToWords(Math.floor((n / 1000) % 100), "thousand ");
        if (Math.floor((n / 100) % 10) != 0)
            out += this.numToWords(Math.floor((n / 100) % 10), "hundred ");
        if (n > 100 && n % 100)
            out += "and ";
        // handles digits at ones and tens places (if any) 
        out += this.numToWords((n % 100), "");
        return out;
    }
    //Conversion from decimal to roman
    ConvertToRoman(num: number): string {
        // Converting to roman
        let m: string[] = new Array(" ", "M", "MM", "MMM");
        let c: string[] = new Array(" ", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM");
        let x: string[] = new Array(" ", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC");
        let i: string[] = new Array(" ", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX");
        let thousands = m[Math.floor(num / 1000)];
        let hundereds = c[Math.floor((num % 1000) / 100)];
        let tens = x[Math.floor((num % 100) / 10)];
        let ones = i[Math.floor(num % 10)];
        let ans = thousands + hundereds + tens + ones;
        return ans.toString().replace(/\s/g, "");;
    }
    //ConvertFromRomanToDecimal
    ConvertRomanToDecimal(roman_Number: string): number {
        var i = 0;
        var number = 0;
        while (roman_Number[i]) {
            if (this.digit(roman_Number[i]) < 0) {
                return 0;
            }
            if ((roman_Number.length - i) > 2) {
                if (this.digit(roman_Number[i]) < this.digit(roman_Number[i + 2])) {
                    return 0;
                }
            }
            if (this.digit(roman_Number[i]) >= this.digit(roman_Number[i + 1]))
                number = number + this.digit(roman_Number[i]);
            else {
                number = number + (this.digit(roman_Number[i + 1]) - this.digit(roman_Number[i]));
                i++;
            }
            i++;
        }
        return number;
    }

    digit(c: any): number {
        let value = 0;
        switch (c) {
            case 'I': value = 1; break;
            case 'V': value = 5; break;
            case 'X': value = 10; break;
            case 'L': value = 50; break;
            case 'C': value = 100; break;
            case 'D': value = 500; break;
            case 'M': value = 1000; break;
            case '\0': value = 0; break;
            default: value = -1;
        }
        return value;
    }


    //Get fraction
    getFraction(numerator: any, denominator: any) {
        return '<span class="fraction"><span>' + numerator + '</span><span class="symbol">&frasl;</span><span class="bottom">' + denominator + '</span></span>';
        //return '<span class="frac"><sup>' + numerator + '</sup><span>&frasl;</span>' + '<sub>' + denominator + '</sub></span>';
    }

    //Get fraction Mathjax
    getFractionMathjax(numerator: any, denominator: any, final = true, bracket_left: any = '', bracket_right: any = '', brackets_flag = false) {
        let str = "";
        if (brackets_flag)
            str = '\\left' + bracket_left + '\\frac{' + numerator + '}{' + denominator + '}\\right' + bracket_right;
        else
            str = '\\frac{' + numerator + '}{' + denominator + '}';

        if (final)
            return '$' + str + '$';
        else
            return str;
    }

    //Display Value Inside Square Root Symbol
    displayRoot(valueToDisplay: any, rootValue?: any) {
        return '<span class="root"><span class="rootValue">' + (rootValue ? rootValue : '') + '</span><span class="radicand">' + valueToDisplay + '</span></span>';
    }

    //Display Matrix
    DrawMatrix(textBeforeMatrix: any, array: any[]): string {
        var mytable = "<div class='matrix-wrapper'>" +
            "<span class='text'>" + textBeforeMatrix + "</span>" +
            "<table class='matrix'><tbody><tr>";

        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array[i].length; j++) {
                mytable += "<td>" + array[i][j] + "</td>";
            }
            mytable += "</tr><tr>";
        }

        mytable += "</tr></tbody></table></div>";

        return mytable;
    }

    //Display Mod
    DrawMod(textBeforeMatrix: any, array: any[]): string {
        var mytable = "<div class='mod-wrapper'>" +
            "<span class='textmod'>" + textBeforeMatrix + "</span>" +
            "<table class='mod'><tbody><tr>";
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array[i].length; j++) {
                mytable += "<td>" + array[i][j] + "</td>";
            }
            mytable += "</tr><tr>";
        }
        mytable += "</tr></tbody></table></div>";
        return mytable;
    }

    // -----------------Determinants --------------
    getCofactor(A: any[], p: any, q: any, n: any) {
        let temp: any = [];
        p = p - 1;
        q = q - 1;
        let i = 0, j = 0;
        // Looping for each element of the matrix 
        for (let row = 0; row < n; row++) {
            if (row < n - 1)
                temp[row] = new Array(n - 1);
            for (let col = 0; col < n; col++) {
                //  Copying into temporary matrix only those element 
                //  which are not in given row and column 
                if (row != p && col != q) {
                    temp[i][j++] = A[row][col];

                    // Row is filled, so increase row index and 
                    // reset col index 
                    if (j == n - 1) {
                        j = 0;
                        i++;
                    }
                }
            }
        }
        return temp;
    }

    getDeterminant(array: any[]) {
        let det = 0;
        if (array.length == 1) {
            det = 1 * array[0][0];
        }
        else if (array.length == 2) {
            det = (array[1][1] * array[0][0] - array[0][1] * array[1][0]);

        } else if (array.length == 3) {
            det = array[0][0] * (array[1][1] * array[2][2] - array[1][2] * array[2][1]) -
                array[0][1] * (array[1][0] * array[2][2] - array[1][2] * array[2][0]) +
                array[0][2] * (array[1][0] * array[2][1] - array[1][1] * array[2][0]);
        }
        return (det);
    }

    getAdjointMatrix(array: any[], Dimension: any) {
        let temp: any = [];
        let row = 0, col;
        for (let i = 0; i < Dimension; i++) { // Iterate for each element of first row 
            temp[i] = new Array(Dimension);
            row++;
            col = 0;
            for (let j = 0; j < Dimension; j++) {
                col++;
                let m = this.getCofactor(array, i + 1, j + 1, Dimension); // Getting Cofactor of array[i][j]
                temp[i][j] = Math.pow((-1), row + col) * this.getDeterminant(m);
            }
        }
        return (temp);
    }


    // display bar over string/number
    displayVinculum(data: any) {
        return '<span style="width: fit-content;border-top: 1px solid #000;">' + data + '</span>';
    }

    displayVinculumDecimals(decimalNumber: any) {
        let array1 = Array.from(decimalNumber.toString().split('.')[0]); // array of numbers before decimal
        let array2 = Array.from(decimalNumber.toString().split('.')[1]); // array of numbers after decimal

        let temp = [];
        let indexes = [];

        for (let i = 0; i < array2.length; i++) {
            temp.push(array2.indexOf(array2[i]));
        }
    }

    // indexes of one repeating element inside array
    getAllIndexes(arr: any, val: any) {
        var indexes = [], i;
        for (i = 0; i < arr.length; i++)
            if (arr[i] === val)
                indexes.push(i);
        return indexes;
    }

    findNonSquareInRange(startNumber: number, endNumber: number = 0, howMany = 1) {
        let array = [];
        let temp = startNumber;
        if (endNumber != 0) {
            temp = this.getRandomNumInRangeInc(startNumber, endNumber);
        }
        while (array.length != howMany || (endNumber != 0 && temp >= endNumber)) {
            // calculating the result 
            var ans = temp + Math.floor(0.5 + Math.sqrt(temp));
            array.push(ans);
            startNumber = startNumber + 1;
            temp = startNumber;
        }

        return array;
    }

    findFraction(n1: number, n2: number, rev: boolean): any {
        let n3 = n1 < n2 ? n1 : n2;
        let n4, n5;
        let HCF = -1;
        for (let i = n3; i > 0; --i) {
            if (n1 % i == 0 && n2 % i == 0) {
                HCF = i;
                n4 = n1 / HCF;
                n5 = n2 / HCF;
                break;
            }
        }
        let result;
        if (n4 == n5) {
            result = '<span class="frac">' + 1 + '</span>';
        }
        if (n5 == 1) {
            result = '<span class="frac">' + n4 + '</span>';
        }
        else {
            if (rev == true)
                result = '<span class="fraction"><span>' + n4 + '</span><span class="symbol">&frasl;</span><span class="bottom">' + n5 + '</span></span>';

            if (rev == false)
                result = '<span class="fraction"><span>' + n5 + '</span><span class="symbol">&frasl;</span><span class="bottom">' + n4 + '</span></span>';

        }
        return result;
    }
    //Generic Method for round off
    genericRoundOff(num: number) {
        var count = this.genericNoCount(num);
        var calculate;
        if (count == 2) {
            calculate = Math.round((num) / 10) * 10;
        }
        else if (count == 3) {
            calculate = Math.round(num / 100) * 100;
        }
        else if (count == 4) {
            calculate = Math.round(num / 1000) * 1000;
        }
        else if (count == 5) {
            calculate = Math.round(num / 10000) * 10000;
        }
        else if (count == 6) {
            calculate = Math.round(num / 100000) * 100000;
        }
        else if (count == 7) {
            calculate = Math.round(num / 1000000) * 1000000;
        }
        else if (count == 8) {
            calculate = Math.round(num / 10000000) * 100000;
        }
        return calculate;
    }
    genericRoundOffUnits(num: number) {
        //var num = this.getRandomNumInRangeInc(10, 99);
        //var num = 9898;
        var calculate;
        //alert("num " + num);
        calculate = Math.round((num) / 1) * 1;
        //alert("calculate " + calculate);
        return calculate;
    }
    genericRoundOffTens(num: number) {
        //var num = this.getRandomNumInRangeInc(10, 99);
        //var num = 9898;
        var calculate;
        //alert("num " + num);
        calculate = Math.round((num) / 10) * 10;
        //alert("calculate " + calculate);
        return calculate;
    }
    genericRoundOffLakhs(num: number) {
        // var num = this.getRandomNumInRangeInc(10000, 99999);
        var calculate;
        //alert("num " + num);
        calculate = Math.round((num) / 100000) * 100000;
        //alert("calculate " + calculate);
        return calculate;
    }
    genericRoundOffHundreds(num: number) {
        //var num = this.getRandomNumInRangeInc(100, 999);
        var calculate;
        //alert("num " + num);
        calculate = Math.round((num) / 100) * 100;
        //alert("calculate " + calculate);
        return calculate;
    }
    genericRoundOffThousands(num: number) {
        // var num = this.getRandomNumInRangeInc(1000, 9999);
        //var num = 9999;
        var calculate;
        //alert("num " + num);
        calculate = Math.round((num) / 1000) * 1000;
        //alert("calculate " + calculate);
        return calculate;
    }
    genericRoundOffTenThousands(num: number) {
        // var num = this.getRandomNumInRangeInc(10000, 99999);
        var calculate;
        //alert("num " + num);
        calculate = Math.round((num) / 10000) * 10000;
        //alert("calculate " + calculate);
        return calculate;
    }
    genericNoCount(num: number) {
        var count = 0;
        if (num >= 1)
            ++count;
        while (num / 10 >= 1) {
            num /= 10;
            ++count;
        }
        return count;
    }
    genericRoundOffAdd(N1: number, N2: number, operation?: string) {
        operation = '';
        var rndn1;
        var rndn2;
        //rndn1 = this.genericRoundOff(N1);
        //rndn2= this.genericRoundOff(N2);
        var result;
        //result = rndn1 + rndn2;
        //alert("result = " + result);
        if (operation == 'tens') {
            rndn1 = this.genericRoundOffTens(N1);
            rndn2 = this.genericRoundOffTens(N2);
            result = rndn1 + rndn2;
        }
        else if (operation == 'hundreds') {
            rndn1 = this.genericRoundOffHundreds(N1);
            rndn2 = this.genericRoundOffHundreds(N2);
            result = rndn1 + rndn2;
        }
        else if (operation == 'thousands') {
            rndn1 = this.genericRoundOffThousands(N1);
            rndn2 = this.genericRoundOffThousands(N2);
            result = rndn1 + rndn2;
        }
        else if (operation == 'ten thousands') {
            rndn1 = this.genericRoundOffTenThousands(N1);
            rndn2 = this.genericRoundOffTenThousands(N2);
            result = rndn1 + rndn2;
        }
        else if (operation == 'lakhs') {
            rndn1 = this.genericRoundOffLakhs(N1);
            rndn2 = this.genericRoundOffLakhs(N2);
            result = rndn1 + rndn2;
        }
        else if (operation == '') {
            rndn1 = this.genericRoundOff(N1);
            rndn2 = this.genericRoundOff(N2);
            result = rndn1! + rndn2!;
        }
        // alert("result " + result);
        return result;
    }
    genericRoundOffSub(N1: number, N2: number, operation?: string) {
        operation = '';
        var rndn1;
        var rndn2;
        //rndn1 = this.genericRoundOff(N1);
        //rndn2= this.genericRoundOff(N2);
        var result;
        //result = rndn1 + rndn2;
        //alert("result = " + result);
        if (operation == 'tens') {
            rndn1 = this.genericRoundOffTens(N1);
            rndn2 = this.genericRoundOffTens(N2);
            result = rndn1 - rndn2;
        }
        else if (operation == 'hundreds') {
            rndn1 = this.genericRoundOffHundreds(N1);
            rndn2 = this.genericRoundOffHundreds(N2);
            result = rndn1 - rndn2;
        }
        else if (operation == 'thousands') {
            rndn1 = this.genericRoundOffThousands(N1);
            rndn2 = this.genericRoundOffThousands(N2);
            result = rndn1 - rndn2;
        }
        else if (operation == 'ten thousands') {
            rndn1 = this.genericRoundOffTenThousands(N1);
            rndn2 = this.genericRoundOffTenThousands(N2);
            result = rndn1 - rndn2;
        }
        else if (operation == 'lakhs') {
            rndn1 = this.genericRoundOffLakhs(N1);
            rndn2 = this.genericRoundOffLakhs(N2);
            result = rndn1 - rndn2;
        }
        else if (operation == '') {
            //N1 = this.getRandomNumInRangeInc(10, 300);
            // N2 = this.getRandomNumInRangeInc(10, 500);
            rndn1 = this.genericRoundOff(N1);
            rndn2 = this.genericRoundOff(N2);
            result = rndn1! - rndn2!;
        }
        //alert("result " + result);
        return result;
    }
    genericRoundOffMul(N1: number, N2: number, operation?: string) {
        operation = '';
        var rndn1;
        var rndn2;
        //rndn1 = this.genericRoundOff(N1);
        //rndn2= this.genericRoundOff(N2);
        var result;
        //result = rndn1 + rndn2;
        //alert("result = " + result);
        if (operation == 'tens') {
            rndn1 = this.genericRoundOffTens(N1);
            rndn2 = this.genericRoundOffTens(N2);
            result = rndn1 * rndn2;
        }
        else if (operation == 'hundreds') {
            rndn1 = this.genericRoundOffHundreds(N1);
            rndn2 = this.genericRoundOffHundreds(N2);
            result = rndn1 * rndn2;
        }
        else if (operation == 'thousands') {
            rndn1 = this.genericRoundOffThousands(N1);
            rndn2 = this.genericRoundOffThousands(N2);
            result = rndn1 * rndn2;
        }
        else if (operation == 'ten thousands') {
            rndn1 = this.genericRoundOffTenThousands(N1);
            rndn2 = this.genericRoundOffTenThousands(N2);
            result = rndn1 * rndn2;
        }
        else if (operation == 'lakhs') {
            rndn1 = this.genericRoundOffLakhs(N1);
            rndn2 = this.genericRoundOffLakhs(N2);
            result = rndn1 * rndn2;
        }
        else if (operation == '') {
            rndn1 = this.genericRoundOff(N1);
            rndn2 = this.genericRoundOff(N2);
            result = rndn1! * rndn2!;
        }
        //alert("result " + result);
        return result;
    }
    genericRoundOffDiv(N1: number, N2: number, operation?: string) {
        operation = '';
        var rndn1;
        var rndn2;
        //rndn1 = this.genericRoundOff(N1);
        //rndn2= this.genericRoundOff(N2);
        var result;
        //result = rndn1 + rndn2;
        //alert("result = " + result);
        if (operation == 'tens') {
            rndn1 = this.genericRoundOffTens(N1);
            rndn2 = this.genericRoundOffTens(N2);
            result = rndn1 / rndn2;
            var a = rndn1 / rndn2;
            result = Math.floor(a);
        }
        else if (operation == 'hundreds') {
            rndn1 = this.genericRoundOffHundreds(N1);
            rndn2 = this.genericRoundOffHundreds(N2);
            result = rndn1 / rndn2;
            var a = rndn1 / rndn2;
            result = Math.floor(a);
        }
        else if (operation == 'thousands') {
            rndn1 = this.genericRoundOffThousands(N1);
            rndn2 = this.genericRoundOffThousands(N2);
            result = rndn1 / rndn2;
            var a = rndn1 / rndn2;
            result = Math.floor(a);
        }
        else if (operation == 'ten thousands') {
            rndn1 = this.genericRoundOffTenThousands(N1);
            rndn2 = this.genericRoundOffTenThousands(N2);
            result = rndn1 / rndn2;
            var a = rndn1 / rndn2;
            result = Math.floor(a);
        }
        else if (operation == 'lakhs') {
            rndn1 = this.genericRoundOffLakhs(N1);
            rndn2 = this.genericRoundOffLakhs(N2);
            result = rndn1 / rndn2;
            var a = rndn1 / rndn2;
            result = Math.floor(a);
        }
        else if (operation == '') {
            rndn1 = this.genericRoundOff(N1);
            rndn2 = this.genericRoundOff(N2);
            result = rndn1! / rndn2!;
            var a = rndn1! / rndn2!;
            result = Math.floor(a);
        }
        //alert("result " + result);
        return result;
    }
    //for non-repeatition of digits in a number
    hasRepeatingdigits(Num: any) {
        return (/([0-9]).*?\1/).test(Num.toString())
    }
    //-----------Generic Divisibility mmethods----------------
    //DivisibleBy2(if the units digit is divisible by 2)
    genericDivisibleBy2(num: number) {
        let split, answer;
        split = num.toString().split('');
        for (var i = 0; i < split.length; i++) {
            //console.log(split[i]);
        }
        let lastdigit = Number(split[split.length - 1]);
        if (lastdigit % 2 == 0) {
            answer = 0;
        }
        else {
            answer = 1;
        }
        return answer;
    }
    //DivisibleBy3(if sum of digits divisible by 3)
    genericDivisibleBy3(num: number) {
        let sum = 0, answer;
        while (num) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        if (sum % 3 == 0) {
            answer = 0;
        }
        else {
            answer = 1;
        }
        return answer;
    }
    //DivisibleBy4(if last two digits in same order divisible by 4)
    genericDivisibleBy4(num: number) {
        let split, answer;
        split = num.toString().split('');
        for (var i = 0; i < split.length; i++) {
            //console.log(split[i]);
        }
        let lastdigit = split[split.length - 1];
        let lastseconddigit = split[split.length - 2];
        let join = Number(lastseconddigit + lastdigit);
        if (join % 4 == 0) {
            answer = 0;
        }
        else {
            answer = 1;
        }
        return answer;
    }
    //DivisibleBy5(if units digit is either 0 or 5)
    genericDivisibleBy5(num: number) {
        let split, answer;
        split = num.toString().split('');
        for (var i = 0; i < split.length; i++) {
            //console.log(split[i]);
        }
        let lastdigit = Number(split[split.length - 1]);
        if (lastdigit == 0 || lastdigit == 5) {
            answer = 0;
        }
        else {
            answer = 1;
        }
        return answer;
    }
    //DivisibleBy6(if divisible by both 2 and 3)
    genericDivisibleBy6(num: number) {
        let answer;
        let divBy2 = this.genericDivisibleBy2(num);
        let divBy3 = this.genericDivisibleBy3(num);
        if (divBy2 == 0 && divBy3 == 0) {
            answer = 0;
        }
        else {
            answer = 1;
        }
        return answer;
    }
    //DivisibleBy8(if last 3 digits in same order divisible by 8)
    genericDivisibleBy8(num: number) {
        let split, answer;
        split = num.toString().split('');
        for (var i = 0; i < split.length; i++) {
            //console.log(split[i]);
        }
        let count = this.genericNoCount(num);
        if (count <= 2) {
            if (num % 8 == 0) {
                answer = 0;
            }
            else {
                answer = 1;
            }
        }
        else {
            let unit = split[split.length - 1];
            let tens = split[split.length - 2];
            let hundreds = split[split.length - 3];
            let join = Number(hundreds) + Number(tens) + Number(unit);
            if (join % 8 == 0) {
                answer = 0;
            }
            else {
                answer = 1;
            }
        }
        return answer;
    }
    //DivisbileBy9(if sum of digits is divisible by 9)
    genericDivisibleBy9(num: number) {
        let sum = 0, answer;
        while (num) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        if (sum % 9 == 0) {
            answer = 0;
        }
        else {
            answer = 1;
        }
        return answer;
    }
    //DivisbileBy10(if its unit digit is 0)
    genericDivisibleBy10(num: number) {
        let split, answer;
        split = num.toString().split('');
        for (var i = 0; i < split.length; i++) {
            //console.log(split[i]);
        }
        let lastdigit = Number(split[split.length - 1]);
        if (lastdigit == 0) {
            answer = 0;
        }
        else {
            answer = 1;
        }
        return answer;
    }
    //DivisibilityBy11
    genericDivisibleBy11(num: number) {
        let result;
        if (num % 11 == 0) {
            result = 0;
        }
        else {
            result = 1;
        }
        return result;
    }

    countMultiplesWithinRange(integer: any, range: number) {
        let result1 = '', quotient = 0, count = 0;
        for (let i = 1; i <= range; i++) {
            if (i % integer == 0) {
                result1 += "," + i;
                count++;
            }
        }
        return count;
    }

    // Generate prime factors of a number
    PrimeFactors(num: number): number[] {

        var primeFactors = [];
        while (num % 2 === 0) {
            primeFactors.push(2);
            num = num / 2;
        }

        var sqrtNum = Math.sqrt(num);
        for (var i = 3; i <= sqrtNum; i++) {
            while (num % i === 0) {
                primeFactors.push(i);
                num = num / i;
            }
        }

        if (num > 2) {
            primeFactors.push(num);
        }
        return primeFactors;
    }


    //get factors
    getFactors(integer: number) {
        let factors = [], quotient = 0;
        for (let i = 2; i <= integer; i++) {
            quotient = integer / i;
            if (quotient === Math.floor(quotient)) {
                factors.push(i);
            }
        }
        return factors;
    }

    // generate factors between a given range, min and max, and of a certain length of array
    genFactors(min: number, max: number, integer: number, length: number): any {
        let factors = [], quotient = 0;
        for (let i = 1; i <= integer; i++) {
            quotient = integer / i;
            if (quotient === Math.floor(quotient)) {
                factors.push(i);
            }
        }
        if (factors.length < length) {
            integer = this.getRandomNumInRangeInc(min, max);
            this.genFactors(min, max, integer, length);
        }
        else {
            return factors;
        }
    }

    getCommonFactors(integer1: any, integer2: any) {
        let result1 = [];
        let array = [];
        let first = this.getFactors(integer1);
        let second = this.getFactors(integer2);
        let ans, ans1, ans2;
        for (let i = 0; i < first.length; i++) {
            for (var j = 0; j < second.length; j++) {
                // for (var k = 0; k < third.length; k++) {
                if (first[i] == second[j]) {
                    ans1 = first[i];
                    ans = array.push(ans1);
                    result1 = array;
                }
                //}
            }
        }
        ans2 = array;
        return ans2;
    }

    // Function to get number line image
    numberLine(canvasId: string, start: number, end: number, points: number[]): string {
        var canvas = document.createElement('canvas');
        canvas.id = canvasId;
        canvas.width = 500;
        canvas.height = 100;
        var ctx: any = canvas.getContext('2d');

        //Pull inputs from form.
        var starti = start;
        var endi = end;
        //var base = points;
        if (points.length > 0) {
            points = points.sort(function (a, b) { return a - b });
        }

        var min, max;

        min = Math.min.apply(null, points);
        max = Math.max.apply(null, points);

        if (min != Math.floor(min)) {
            min = Math.floor(min);
        }

        var w = canvas.width;
        var h = canvas.height;

        //Extend Range if Calculation goes out of bounds.

        if (max > endi && min < starti) {
            if (max < 0) {
                endi = Math.round(max) + 1;
            }
            else if (max > 0) {
                endi = Math.round(max) + 1;
            }
            else {
                endi = endi;
            }

            if (min <= 0) {
                starti = Math.round(min) - 1;
            }
            else if (min > 0) {
                starti = Math.round(min) - 1;
            }
            else {
                starti = starti;
            }
        }
        else if (max > endi) {
            if (max < 0) {
                endi = Math.round(max) + 1;
            }
            else if (max > 0) {
                endi = Math.round(max) + 1;
            }
            else {
                endi = endi;
            }
        }
        else if (min < starti) {
            if (min <= 0) {
                starti = Math.round(min) - 1;
            }
            else if (min > 0) {
                starti = Math.round(min) - 1;
            }
            else {
                starti = starti;
            }
        }

        var totRange = endi - starti;
        var x0 = w / 2;
        var interval = Math.round((w / totRange) / 1.1);

        ctx.font = "12px Arial";
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, w, h);
        ctx.fill();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
        ctx.stroke();
        //arrow - left
        ctx.moveTo(0, h / 2);
        ctx.lineTo(5, h / 2 + 5);
        ctx.stroke();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(5, h / 2 - 5);
        ctx.stroke();
        //arrow - right
        ctx.moveTo(w, h / 2);
        ctx.lineTo(7 * w / 7 - 5, h / 2 + 5);
        ctx.stroke();
        ctx.moveTo(w, h / 2);
        ctx.lineTo(7 * w / 7 - 5, h / 2 - 5);
        ctx.stroke();

        var k = Math.round((totRange / 2) - totRange);

        for (var i = starti; i <= endi; i++) {
            ctx.beginPath();
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.fillStyle = '#000';
            if (i == min) {
                //Highlight the Starting Point
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#000';
                ctx.fillStyle = '#000';
                x0 = (w / 2 + k * interval);
            }

            if (totRange === 1) {
                x0 = (w / 2) / 10;
                ctx.moveTo(x0 + k * interval, h / 2 - 6);
                ctx.lineTo(x0 + k * interval, h / 2 + 6);
                //Line numbers.
                if (i < 0) {
                    ctx.fillText("" + i, (x0 + k * interval) - 9, h / 2 + 25);
                }
                else {
                    ctx.fillText("" + i, (x0 + k * interval) - 5, h / 2 + 25);
                }
            }
            else {
                //Measuring lines
                ctx.moveTo(w / 2 + k * interval, h / 2 - 6);
                ctx.lineTo(w / 2 + k * interval, h / 2 + 6);
                //Line numbers.
                if (i < 0) {
                    ctx.fillText("" + i, (w / 2 + k * interval) - 9, h / 2 + 25);
                }
                else {
                    ctx.fillText("" + i, (w / 2 + k * interval) - 5, h / 2 + 25);
                }
            }

            ctx.fill();
            ctx.stroke();
            k++;
        }

        this.drawPoints(ctx, points, h, interval, x0);

        var imgurl = canvas.toDataURL();

        return '<img src="' + imgurl + '"/>';
    }

    // Draws points from array
    drawPoints(ctx: any, points: number[], height: number, diff: number, zeroValue: number) {
        if (points.length > 0) {
            let min = Math.min.apply(null, points);
            for (let i = 0; i < points.length; i++) {
                ctx.font = "10px Arial";
                ctx.beginPath();
                ctx.arc(zeroValue + (points[i] - min) * diff, height / 2, 4, 0, 2 * Math.PI);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.stroke();
            }
        }
    }

    gcd(a: any, b: any): any {
        var t = 0;
        a < b && (t = b, b = a, a = t); // swap them if a < b
        t = a % b;
        return t ? this.gcd(b, t) : b;
    }

    lcm(a: any, b: any): any {
        return a / this.gcd(a, b) * b;
    }

    //---------------------- Harshal Section ----------------------------//

    funprimenumber(num: number) {
        let flag = 0;
        let answer;
        let tempnum: number;
        //tempnum: number = 0;
        tempnum = num / 2;
        // let i: number;
        for (let i = 2; i <= tempnum; i++) {

            if (num % i == 0) {

                flag = 1;
                answer = 1;
                break;

            }

        }

        if (flag == 0) {
            answer = 0;
            // _qp.ans = number;

        }
        return answer;

    }

    //create canvas which will return You Canvas object
    CreateCanvasInstance(canvasId: string, width: number, height: number) {
        //make Canvas Instance.......
        var graphCanvas = document.createElement('canvas');
        graphCanvas.id = canvasId;
        graphCanvas.width = width;
        graphCanvas.height = height;

        var ctx = graphCanvas.getContext("2d");
        var radius = graphCanvas.height / 2;

        ctx!.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
        ctx!.save();
        return ctx;
    }

    // -------------Section End ----------------------------------//

    //--------------Narender Section Starts --------------------------------//
    //Get Filter Message according time whatever input comes, in which we can diff output meassage with browo or appricatied for user
    getFilteredMessage(_second: number, Time: number) {
        let seconds: number = _second;
        let msg: string = "";
        let time = Time - seconds;

        if (time) {
            if (seconds < 15) {
                msg = "Hard Work - Fair!! ";
            }
            else if (seconds < 30) {
                msg = "Great!! ";
            }
            else if (seconds < 45) {
                msg = "Fantastic!!";
            }
            else if (seconds < 60) {
                msg = "Terrific!!";
            }

            //        msg += "|" + " End time is " + time + " Seconds ";
        }
        return msg;

    }
    //--------------Narender Section End --------------------------------//

    //Generic question and solution code
    solutionStringFun(solutionPattern: string[], dynamicVal: any[]) {
        let solutionString = "";
        for (let i = 0, j = 0; i < solutionPattern.length; i++) {
            if (solutionPattern[i].search("#") != -1) {
                solutionPattern[i] = dynamicVal[j++];
            }

            solutionString += solutionPattern[i];
        }
        return solutionString;
    }
    patternStringFun(patternString: string[], dynamicVal: any[]) {
        let pattern = "";
        for (let i = 0, j = 0; i < patternString.length; i++) {
            if (patternString[i].search("#") != -1) {
                patternString[i] = dynamicVal[j++];
            }

            pattern += patternString[i];
        }
        return pattern;
    }

    // Get first n prime numbers array
    getFirstNPrimeNumbers(FirstN: number) {
        let ct = 0, n = 0, i = 1, j = 1, primeAry = [];
        while (n < FirstN) {
            j = 1;
            ct = 0;
            while (j <= i) {
                if (i % j == 0)
                    ct++;
                j++;
            }
            if (ct == 2) {
                primeAry.push(i);
                n++;
            }
            i++;
        }
        return primeAry;
    }


    getNumeratorDenominator(n1: number, n2: number, rev: boolean): any {
        let n3 = n1 < n2 ? n1 : n2;
        let n4, n5;
        let HCF = -1;
        for (let i = n3; i > 0; --i) {
            if (n1 % i == 0 && n2 % i == 0) {
                HCF = i;
                n4 = n1 / HCF;
                n5 = n2 / HCF;
                break;
            }
        }
        let result;
        if (n4 == n5) {
            result = '<span class="frac">' + 1 + '</span>';
        }
        if (n5 == 1) {
            result = '<span class="frac" >' + n4 + '</span>';
        }
        else {
            if (rev == true)
                result = n4 + "||" + n5;
            if (rev == false)
                result = n5 + "||" + n4;
        }
        return result;
    }

    //positive number and negative number with brackets
    getNosWithBrackets(num: number) {
        let num1 = (num >= 0) ? num : '(' + num + ')';
        return num1;
    }
    //Fractional power
    fractionalPower(numerator: any, denominator: any) {
        return '<sup style="font-size:40px">' + numerator + '&frasl;<sub style="font-size:40px">' + denominator + '</sub></sup>';
    }

    //mathjax

    public sl: any = '$\\Bigg \[$';
    public sr: any = '$\\Bigg \]$';
    public rl: any = '$\\Bigg \($';
    public rr: any = '$\\Bigg \)$';



}

