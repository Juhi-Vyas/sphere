function separateDigits(nums) {
    let ans = []
    for (let i = nums.length-1; i >= 0; i--) {
        let num = nums[i]
        while(num > 0){
            let lastDigit = parseInt(num % 10)
            num = parseInt(num / 10)
            ans.unshift(lastDigit)
        }
    }
    return ans
};
console.log(separateDigits([13,25,83,77]))