import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";
import Address from "../models/Address";

export enum TYPE_ADDRESS {
  MULTISIG = "Multisig",
  USER = "User",
  TOKEN = "Jetton",
}

const useAddressTable = () => {
  const database = useDatabase();
  const addressesCollection = database.get<Address>("addresses");
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    fetchAddresses();
  }, [addressesCollection]);

  const fetchAddresses = async () => {
    const allAddresses = await addressesCollection.query().fetch();
    setAddresses(allAddresses);
  };

  const handleCreateAddress = async (data: Partial<Address>) => {
    await database.write(async () => {
      await addressesCollection.create((address: Address) => {
        address.type = data.type;
        address.name = data.name;
        address.address = data.address;
        // address.type = TYPE_ADDRESS.USER;
        // address.name = "Tester";
        // address.address = "UQDOAHXyCPFOXAXm9c1P_NeNEeSWy6IaRHqJRnBUp0jMZ6i3";

        // address._setRaw("type", TYPE_ADDRESS.USER);
        // address._setRaw("name", "Tester");
        // address._setRaw(
        //   "address",
        //   "UQDOAHXyCPFOXAXm9c1P_NeNEeSWy6IaRHqJRnBUp0jMZ6i3"
        // );
      });
    });

    const allAddresses = await addressesCollection.query().fetch();
    setAddresses(allAddresses);
  };

  const handleUpdateAddress = async (
    addressId: string,
    dataUpdate: Partial<Address>
  ) => {
    const address = await addressesCollection.find(addressId);

    await database.write(async () => {
      await address.update((address: Address) => {
        address.type = dataUpdate.type;
        address.name = dataUpdate.name;
        address.address = dataUpdate.address;
      });
    });

    const allAddresses = await addressesCollection.query().fetch();
    setAddresses(allAddresses);
  };

  const handleDeleteAddress = async (addressId: string) => {
    const address = await addressesCollection.find(addressId);

    await database.write(async () => {
      await address.markAsDeleted();
    });

    const allAddresses = await addressesCollection.query().fetch();
    setAddresses(allAddresses);
  };

  return {
    handleCreateAddress,
    handleUpdateAddress,
    handleDeleteAddress,
    fetchAddresses,
    addresses,
  };
};

export default useAddressTable;
