var groupAnagrams = function(strs) {
  let anagrams = {}, output = [];
  for (let i = 0; i < strs.length; i++) {
    let key = Array(26).fill(0);
    for (let j = 0; j < strs[i].length; j++) {
      let index = strs[i][j].charCodeAt() - 97;
      key[index] = key[index] + 1 || 1;
    }
    if (anagrams[key]) {
      anagrams[key].push(strs[i]);
    } else {
      anagrams[key] = [strs[i]];
    }
  }
   
  for (let k in anagrams) {
    output.push(anagrams[k]);
  }

  return output;
};