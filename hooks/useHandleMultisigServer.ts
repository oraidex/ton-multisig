export type MultisigSnapshot = {
  id?: number;
  name: string;
  address: string;
  createdBy: string;
  importedBy: string;
  signers: string;
  proposers: string;
};

export const DEFAULT_BE_DATA = {
  id: 0,
  name: "",
  address: "",
  createdBy: "",
  importedBy: "",
  signers: "",
  proposers: "",
};

export const BASE_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000";

export const parseJsonDataFromSqlite = (dataStored: string) => {
  try {
    if (dataStored) {
      const jsonData = JSON.parse(dataStored);
      return jsonData;
    }
  } catch (error) {
    console.log("Parse data db error", error);
  }
};

const useHandleMultisigServer = () => {
  const addMultisigSnapshot = async (data: MultisigSnapshot) => {
    try {
      const response = await fetch("/api/multisig", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      if (response.ok) {
        console.log("MultisigSnapshot add successfully!");
        return res;
      } else {
        throw res.error;
      }
    } catch (error) {
      console.log("Snapshot Add error:", error);
    }
  };

  const updateMultisigSnapshot = async (
    id: string | number,
    data: Partial<MultisigSnapshot>,
    userAddress: string
  ) => {
    try {
      const response = await fetch(
        `/api/multisig/${id}?userAddress=${userAddress}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const res = await response.json();
      if (response.ok) {
        console.log("MultisigSnapshot update successfully!");
        return res;
      } else {
        throw res.error;
      }
    } catch (error) {
      console.log("Snapshot Update error:", error);
    }
  };

  const getMultisigDetailSnapshot = async (id: string | number) => {
    try {
      const response = await fetch(`/api/multisig/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      if (response.ok) {
        console.log("MultisigSnapshot Get successfully!");
        return res;
      } else {
        throw res.error;
      }
    } catch (error) {
      console.log("Snapshot Get error:", error);
    }
  };

  const getMultisigListSnapshot = async (userAddress: string | number) => {
    try {
      const response = await fetch(
        `/api/multisig?addressUser=${encodeURIComponent(userAddress)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await response.json();
      if (response.ok) {
        console.log("MultisigSnapshot Get List successfully!");
        return res;
      } else {
        throw res.error;
      }
    } catch (error) {
      console.log("Snapshot Get List error:", error);
    }
  };

  return {
    addMultisigSnapshot,
    updateMultisigSnapshot,
    getMultisigDetailSnapshot,
    getMultisigListSnapshot,
  };
};

export default useHandleMultisigServer;
