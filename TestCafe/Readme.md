# Example of using TestCafe for Test Automation

## Installation

Install TestCafe as a local testing environment on your computer by following the instructions from

[http://devexpress.github.io/testcafe/documentation/getting-started/](http://devexpress.github.io/testcafe/documentation/getting-started/)

## Extra packages to install


Install the package [csv-load-sync](https://www.npmjs.com/package/csv-load-sync)
'''
npm install csv-load-sync
'''


## Run

There are two test cases

### 1. sample-test-case-accessing-website

This just access the website and clicks on login. 

'''
testcafe chrome sample-test-case-accessing-website.js
'''

### 2. test-case-submitting-values.js

This test cases will login, access the Triangle functionality and then read from a file test cases and execute them one by one. 

'''
testcafe chrome test-case-submitting-values.js 
'''


