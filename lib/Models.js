import mongoose, { Schema } from "mongoose";


const CashtypeSchema = new Schema(
    {
        name: String
    },
    {
        timestamps: true
    }
);

export const CashtypeModel = mongoose.models.Cashtype || mongoose.model("Cashtype", CashtypeSchema);


//-----------------------------------------------------------------------

const CustomerSchema = new Schema(
    {
        name: String,
        address: String,
        contact: String
    },
    {
        timestamps: true
    }
);

export const CustomerModel = mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);

//-----------------------------------------------------------------------

const EmployeeSchema = new Schema(
    {
        name: String,
        address: String,
        post_id: { type: Schema.Types.ObjectId, ref: 'Post' },
        salary: Number,
        join_dt: Date,
        contact: String
    },
    {
        timestamps: true
    }
);

export const EmployeeModel = mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);

//-----------------------------------------------------------------------

const ItemSchema = new Schema(
    {
        name: String,
        description: String
    },
    {
        timestamps: true
    }
);

export const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema);

//-----------------------------------------------------------------------

const PaymentSchema = new Schema(
    {
        customerid: { type: Schema.Types.ObjectId, ref: 'Customer' },
        dt: Date,
        cashtypeid: { type: Schema.Types.ObjectId, ref: 'Cashtype' },
        bank: String,
        taka: Number
    },
    {
        timestamps: true
    }
);

export const PaymentModel = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);

//-----------------------------------------------------------------------

const PostSchema = new Schema(
    {
        name: String,
        shortname: String
    },
    {
        timestamps: true
    }
);

export const PostModel = mongoose.models.Post || mongoose.model("Post", PostSchema);

//-----------------------------------------------------------------------

const SupplierSchema = new Schema(
    {
        name: String,
        address: String,
        contact: String
    },
    {
        timestamps: true
    }
);

export const SupplierModel = mongoose.models.Supplier || mongoose.model("Supplier", SupplierSchema);

//-----------------------------------------------------------------------


const UserSchema = new Schema(
    {
        user_name: String,
        pw: String
    },
    {
        timestamps: true
    }
);

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);  


//------------------------------------------------------------------------------------
const SalarySchema = new Schema(
    {
        employee: { type: Schema.Types.ObjectId, ref: 'Employee' },
        month: { type: Number, required: true },
        taka: { type: Number, required: true },
        deduct: { type: Number, required: true },
        arear: { type: Number, required: true },
        note: { type: String }       
    },
    {
        timestamps: true
    }
);

export const SalaryModel = mongoose.models.Salary || mongoose.model("Salary", SalarySchema); 