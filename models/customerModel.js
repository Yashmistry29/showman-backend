class Customer{
  constructor(c_id, name, address, phone, regular, latestJobId, jobIDs) {
    this.c_id = c_id;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.regular = regular;
    this.latestJobId = latestJobId;
    this.jobIDs = jobIDs;
  }
}

module.exports = Customer;