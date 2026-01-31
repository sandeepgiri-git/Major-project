"use client";

import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { backendURL } from "@/types/types";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";


const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [fetchDone, setFD] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const [summary, setSummary] = useState({});
  const [interview, setInterview] = useState({});
  const [isStarting, setIsStarting] = useState(true);

  const router = useRouter();

  const getUser = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      setFD(true);
      return;
    }

    try {
      const res = await axios.get(`${backendURL}/auth/me`, {
        headers: { authorization: `${token}` },
      });
      if(res.data.success) {
        setUser(res.data.user)
        setIsAuth(true);
      }
      setLoading(false);
      // console.log(fetchDone)
      // console.log(user);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setFD(true);
      setLoading(false);
    }
  };

  const getInterviews = async () => {
    const token = localStorage.getItem("token");
    // console.log(token)
    try {
      if(!token) {
        return;
      }

      const res = await axios.get(`${backendURL}/interview/getallinterviews`, 
        {
          headers: {'authorization' : token},
        }
      )

      // console.log(res.data);
    
      if(res.data.success) {
        res.data.interviews.reverse();
        setInterviews(res.data.interviews);
        return;
      }
      console.log("object")
      toast.error(res.data.message);
      return;

    } catch (error) {
      console.log(error);
    }
  }

  const getSummary = async (id: string) => {
      const token = localStorage.getItem("token");

      try {
        if(!token && !id) return;

        const res = await axios.get(`${backendURL}/interview/getsummary/${id}`, 
          {headers: {'authorization': token}}
        )

        if(!res.data.success) {
          console.log(res.data.message);
          await generateSummary(id);
          return;
        }

        setSummary(res.data.summary);
        setInterview(res.data.interview);
        return res.data;

      } catch (error) {
        console.log(error);
      }
  }

  const checkAnswer = async (data: any, id: string) => {
    const token = localStorage.getItem('token');
    try {
      if(!token) return;
      const res = await axios.post(`${backendURL}/interview/checkanswer/${id}`,
        {...data},
        {headers: {'authorization': token}}
      )
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  const login = async (email: string, password: string) => {
    try{
      const res = await axios.post(`${backendURL}/auth/login`, 
        {email: email, password: password}
      )
      const data = res.data;
      // console.log(data);
      if (data.success) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsAuth(true);
        toast.success("Logged in successfully");
        router.push('/')
        return;
      }
      toast.error("Login Failed !")
      return;
    }catch(error) {
      console.log(error);
    }finally {
      setFD(true)
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try{  
      const res = await axios.post(`${backendURL}/auth/signup`, 
        {name: name, email: email, password: password}
      )
      const data = res.data;
      console.log(data);
      if(data.success) {
        localStorage.setItem("otpToken", data.token);
        toast.success("OTP has been sent to your email");
        return true;
      }else{
        toast.error("Something went wrong");
      }
      console.log(data);
      return false;
    }catch(error) {
      toast.error("failed");
      console.log(error);
      return false;
    }
  };

  const checkOtp = async (otp: number) => {
    const token = localStorage.getItem("otpToken");
    try {
      const res = await axios.post(`${backendURL}/auth/checkotp`, 
        {otp, token}
      )

      const data = res.data;

      if(!data.success) {
        toast.error(data.message);
        return false;
      }

      toast.success("Account created successfully! Please Login");
      // router.push("/login");
      return true;
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
      return false;
    }
  }  

  const startInterview = async (id: string) => {
    const token = localStorage.getItem('token');
    console.log("hit", id);
    try {
      const res = await axios.get(`${backendURL}/interview/startinterview/${id}`,
        {headers: {"authorization": token}}
      )

      if(!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success("Interview started")
      console.log(res.data);

    } catch (error) {
      console.log(error)
      toast.error("Failed to start");
    } finally {
      setIsStarting(false);
    }
  }

  const submitInterview = async (id: string) => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get(`${backendURL}/interview/submitinterview/${id}`,
        {headers: {"authorization": token}}
      )

      if(!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success("Interview submitted")
      console.log(res.data);

    } catch (error) {
      console.log(error)
      toast.error("Failed to submit");
    }
  }

  const deleteInterview = async (id: string) => {
    const token = localStorage.getItem('token');
    try { 
      if(!token) return;
      const res = await axios.delete(`${backendURL}/interview/deleteinterview/${id}`,
        {headers: {'authorization': token}}
      )
      if(res.data.success){
        console.log(res.data);
        // refresh interviews
        await getInterviews();
        toast.success("Interview deleted successfully");
      }else{
        console.log(res.data.message);
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete interview");
    }
  }

  const generateSummary = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
      if(!token) return;
      const res = await axios.get(`${backendURL}/interview/generatesummary/${id}`,
        {headers: {'authorization': token}}
      )

      console.log(res.data);
      if(res.data.success){
         console.log(res.data)
        // redirect to interview result

      }else{
        console.log(res.data.message);
        toast.error(res.data.message);
      }
      return res.data;

    } catch (error) {
      console.log(error);
    }
  }

  const createInterview = async (data: any) => {
    const token = localStorage.getItem('token');
    // console.log(token);
    try{
      if(!token) {
        toast.error("Please login first");
        return;
      }

      const res = await axios.post(`${backendURL}/interview/createinterview`,
        {...data},
        {headers: {'authorization' : token}}
      );

      if(!res.data.success) {
        console.log(res.data.message);9
        return;
      }

      console.log(res.data);
      return res.data;

    }catch(error) {
      console.log(error)
    }
  }

  const onboarding = async (data: any) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(`${backendURL}/auth/onboarding`, {
        targetRoles: data.targetRoles,
        technicalSkills: data.skills
      }, {headers: {'authorization' : token}});

      console.log(res.data);
      if(res.data.success){
        toast.success("Profile updated successfully");
        return true;
      }
      return false;
    }
    catch(err) {
      console.log(err);
      return false;
    }
  }

  useEffect(() => {
    const getData = async() => {
      await getUser();
      await getInterviews();
    }
    getData();
  }, []);

  useEffect(() => {
    const getData = async() => {
      // console.log("calling")
      await getInterviews();
      // console.log("done")
    }
    if(interviews.length == 0 && user) getData();
  }, [isAuth, user]);

  const logout = () => {
    try{
      localStorage.removeItem("token");
      setUser(null);
      setIsAuth(false);
      setFD(false);
      toast.success("Logged out successfully");
      // want to go homePage
      // console.log("reloading")
      window.location.reload()
      // console.log("reloaded")
      // redirect("/");
    }catch(error) {
      toast.error("Failed to logout");
      console.log(error);
    }
  };


  return (
    <AuthContext.Provider value={{ 
        summary, user,fetchDone, interviews,loading, onboarding,
        checkAnswer, generateSummary, startInterview, submitInterview, deleteInterview,
        login, logout, isAuth, getSummary, interview ,createInterview, signup, checkOtp
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
