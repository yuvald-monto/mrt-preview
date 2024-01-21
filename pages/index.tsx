import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { TableRMT } from "@/components/TableRMT";
import { MRT_ColumnDef } from "material-react-table";
import { tableData } from "@/tableData";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const columns: MRT_ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  }, {
    accessorKey: "name",
    header: "Name",
  }, {
    accessorKey: "lastName",
    header: "Last Name",
  }
]



export default function Home() {
  const router = useRouter();
  const movePage = (row: any) => {
    console.log(row);
    router.push("/example");
  }

  return (
    <>
      <Head>
        <title>Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <TableRMT data={tableData} columns={columns} tableSortKey="exampleTable" tableName="example table" isLoading={false} onRowClick={movePage}/>
      </main>
    </>
  );
}
