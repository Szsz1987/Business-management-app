const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should throw an error if any arg is missing', () => {

    const cases = [
      {
        firstName: 'Mark',
        lastName: 'Smith'
      },
      {
        firstName: 'Mark',
        department: 'IT'
      },
      {
        lastName: 'Smith',
        department: 'IT'
      }
    ];

    for(let type of cases){
      const emp = new Employee(type);
      emp.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if "firstName" is not a string', () => {
    const cases = [{}, []];
    for(let test of cases) {
      const dep = new Employee({ firstName: test, lastName: 'Smith', department: 'Marketing'});
      dep.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if "lastName" is not a string', () => {
    const cases = [{}, []];
    for(let test of cases) {
      const dep = new Employee({ firstName: 'Mark', lastName: test, department: 'Marketing'});
      dep.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if "department" is not a string', () => {
    const cases = [{}, []];
    for(let test of cases) {
      const dep = new Employee({ firstName: 'Mark', lastName: 'Smith', department: test});
      dep.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });
  
  it('should throw no errors when pass proper args', () => {
    const cases = [
      {
        firstName: 'Mark',
        lastName: 'Smith',
        department: 'Marketing'
      },
    ]
    for(let test of cases) {
      const dep = new Employee(test);
      dep.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });
  after(() => {
    mongoose.models = {};
  });

});