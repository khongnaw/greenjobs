/**
 * Description: Set of JavaScript functions to perform queries on a data structure taken from the Hawaii Directory of Green Employers.
 * Created by sora1234 on 9/29/2015.
 */

/*globals _, greenjobs */
/*exported listIndustries*/
/*exported jobswithKeyword*/
/*exported industryJobs*/
/*exported maxIndustryJobs*/
//var testdata = greenjobs.splice(0,4);

/**
 * This functions can be passed greenjobs and
 * returns an array of strings indicating all the industries in the dataset (no duplicates).
 * @param data , Green Employers array of objects
 * @return array ,array of industry names
 * */
function listIndustries(data) {
  return _.uniq(_.pluck(data, "Industry"));
}

/**
 * This function can be passed greenjobs and returns an object where the keys are County
 * names and the values are the number of Green Jobs listed in that County.
 * @param data, Green Employers array of objects
 * @return object , { <county>: <number of Green Jobs> }
 */
function countyGreenJobs(data) {

  return _.countBy(_.pluck(data, "County"));

}

/**
 * This function can be passed greenjobs and a string and returns a list of Job Titles
 * containing the passed string.
 * @param data, Green Employers array of objects
 * @return array, Job titles with part of the keyword
 */

function jobswithKeyword(data, keyword) {
  var filtered = _.filter(data,function(num){
    return num["Job Title"].search(keyword) !== -1;
  });
  return _.map(filtered,function(num){
    return num["Job Title"];
  });

}

/**
 * This function can be passed greenjobs and returns an array containing objects with keys
 * “industry” and “jobs”. The value of the industry key is an industry name, and the value
 * of jobs is the number of jobs associated with that industry.
 * @param data, Green Employers array of objects
 * @return array, [{industry:... jobs:...}, {industry:... jobs:...} ...]
 */

function industryJobs(data) {
  var groupByIn = _.groupBy(data, function (num) {
    return num["Industry"];
  });
  return _.map(groupByIn, function (num, key) {
    return {
      industry: key,
      jobs: _.reduce(num, function (memo) {
        return memo + 1;
      }, 0)
    };
  });

}
/**
 * This function can be passed greenjobs and returns the object from the array returned by * industryJobs with the largest value for jobs.
 * @param data, Green Employers array of objects
 * @return object, {industry:..., jobs:...}
 */

function maxIndustryJobs(data) {
  return _.max(industryJobs(data), function(num){
    return num["jobs"];
  });
}
