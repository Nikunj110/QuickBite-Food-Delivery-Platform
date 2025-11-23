import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(url + "/api/order/verify", { success, orderId });
            if (response.data.success) {
                navigate("/");
                toast.success("Order Placed Successfully");
            } else {
                toast.error("Something went wrong");
                navigate("/");
            }
        } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Verification failed");
            navigate("/");
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-28">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <div className="mb-8">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 border-4 border-gray-200 border-t-black rounded-full mx-auto mb-6"
                    />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Verifying Payment
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                    Please wait while we verify your payment and process your order...
                </p>
                
                <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                </div>
            </motion.div>
        </div>
    )
}

export default Verify
