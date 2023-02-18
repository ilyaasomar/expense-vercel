import TransectionModel from "../models/Transections.js";
// import moment from "moment";
// get all transections
export const getTransections = async (req, res) => {
  const transections = await TransectionModel.find().where({
    createdby: req.userId,
  });
  // .sort({ registred_date: -1 });
  res.status(200).json(transections);
};

// transection creation
export const createTransection = async (req, res) => {
  const { transection_type, amount, registred_date, description } = req.body;
  try {
    if (!transection_type && !amount && !registred_date && !description) {
      return res.status(401).json({ message: "All fields are mendatory" });
    } else {
      if (transection_type === "deposit") {
        const data = await TransectionModel.create({
          transection_type,
          amount,
          registred_date,
          description,
          createdby: req.userId,
        });
        res.status(200).json(data);
      } else if (transection_type === "withdraw") {
        const deposit_data = await TransectionModel.find().where({
          transection_type: "deposit",
          createdby: req.userId,
        });
        let deposit_balance = 0;
        deposit_data.forEach((data) => {
          deposit_balance += data.amount;
        });
        const withdraw_data = await TransectionModel.find().where({
          transection_type: "withdraw",
          createdby: req.userId,
        });
        let withdraw_balance = 0;
        withdraw_data.forEach((data) => {
          withdraw_balance += data.amount;
        });
        let total = deposit_balance - withdraw_balance;
        // hadi empty u yahay you don't have a deposit
        if (deposit_data.length === 0) {
          res.status(404).json("You don't have a deposit");
        } else if (total < amount) {
          res
            .status(404)
            .json(
              `You don't have a sufficient amount. Your balance is only $${total}`
            );
        } else {
          const data = await TransectionModel.create({
            transection_type,
            amount,
            registred_date,
            description,
            createdby: req.userId,
          });
          res.status(200).json(data);
        }
      } else {
        res.status().json("unknown error");
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get single transection
export const getSingleTransSection = async (req, res) => {
  const { id } = req.params;
  try {
    const transection = await TransectionModel.findById(id).where({
      createdby: req.userId,
    });
    if (!transection) {
      return res.status(404).json({ message: "No transection found" });
    } else {
      return res.status(200).json(transection);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update transection
export const updateTransection = async (req, res) => {
  const { id } = req.params;
  const { transection_type, amount, registred_date, description } = req.body;
  try {
    if (!transection_type && !amount && !registred_date && !description) {
      return res.status(401).json({ message: "All fields are mendatory" });
    } else {
      if (transection_type === "deposit") {
        const data = {
          transection_type,
          amount,
          registred_date,
          description,
          createdby: req.userId,
        };
        const updatedData = await TransectionModel.findByIdAndUpdate(
          id,
          { $set: data },
          { new: true }
        );
        res.status(200).json(updatedData);
      } else if (transection_type === "withdraw") {
        const deposit_data = await TransectionModel.find().where({
          transection_type: "deposit",
          createdby: req.userId,
        });
        let deposit_balance = 0;
        deposit_data.forEach((data) => {
          deposit_balance += data.amount;
        });
        const withdraw_data = await TransectionModel.find().where({
          transection_type: "withdraw",
          createdby: req.userId,
        });
        let withdraw_balance = 0;
        withdraw_data.forEach((data) => {
          withdraw_balance += data.amount;
        });
        let total = deposit_balance - withdraw_balance;
        // hadi empty u yahay you don't have a deposit
        if (deposit_data.length === 0) {
          res.status(404).json("You don't have a deposit");
        } else if (total < amount) {
          res
            .status(404)
            .json(
              `You don't have a sufficient amount. Your balance is only $${total}`
            );
        } else {
          const data = {
            transection_type,
            amount,
            registred_date,
            description,
            createdby: req.userId,
          };
          const updatedData = await TransectionModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
          );
          res.status(200).json(updatedData);
        }
      } else {
        res.status().json("unknown error");
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const checkStatement = async (req, res) => {
  const { transaction_type, start_date, end_date } = req.body;
  try {
    if (transaction_type === "all") {
      const transection = await TransectionModel.find().where({
        createdby: req.userId,
        registred_date: { $gte: start_date, $lte: end_date },
      });
      return res.status(200).json(transection);
    } else if (transaction_type === "deposit") {
      const transection = await TransectionModel.find().where({
        transection_type: "deposit",
        createdby: req.userId,
        registred_date: { $gte: start_date, $lte: end_date },
      });
      return res.status(200).json(transection);
    } else if (transaction_type === "withdraw") {
      const transection = await TransectionModel.find().where({
        transection_type: "withdraw",
        createdby: req.userId,
        registred_date: { $gte: start_date, $lte: end_date },
      });
      return res.status(200).json(transection);
    } else {
      return res.status(404).json({ message: "No Statement Found!" });
    }
    // .gte(from_date)
    // .lt(to_date);
    // transaction_type: transaction_type,
    // registred_date: { $gte: Date(start_date), $lt: Date(end_date) },
    //
    // if (!transection) {
    //   return res.status(404).json({ message: "No transection found" });
    // } else {
    // return res.status(200).json(transection);
    // }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// delete transection
export const deleteTransection = async (req, res) => {
  const { id } = req.params;
  try {
    const transection = await TransectionModel.findByIdAndRemove(id).where({
      createdby: req.userId,
    });
    if (!transection) {
      res.status(401).json({ message: "No transection found" });
    } else {
      res.status(200).json(transection);
    }
  } catch (error) {}
};
