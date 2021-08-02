# [Quality Assurance Projects - American / British Translator](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/american-british-translator)
FreeCodeCamp - Quality Assurance Project

- For those words with space inside (e.g. "black pudding"), we could only replace the string word by word, the time complexity is O(n * m), where n is the length of input text, m is the length of dictionary object
- For those words without space, we could take the advantage of object search (hash table provide almost O(1) time complexity!). Therefore the time complexity here is O(n). 
- Negative look behind (?<![\w-]) and negative look ahead (?![\w-]) could prevent convert the word in word (such as 'ta' in 'tameto')
- Unit test and functional test with Mocha/Chai
