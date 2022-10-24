class JobData{
  constructor(jobID, noOfShirts, noOfPants, ReturnDate, TotalPrice, shirtData, pantData) {
    this.jobID = jobID;
    this.noOfShirts = noOfShirts;
    this.noOfPants = noOfPants;
    this.ReturnDate = ReturnDate;
    this.TotalPrice = TotalPrice;
    this.shirtData = shirtData;
    this.pantData = pantData;
  }
}

module.exports = JobData;