package main

import (
	"fmt"

	greptime "github.com/GreptimeTeam/greptimedb-client-go"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func InitClient() *greptime.Client {
	options := []grpc.DialOption{
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	}
	// To connect a database that needs authentication, for example, those on Greptime Cloud,
	// `Username` and `Password` are needed when connecting to a database that requires authentication.
	// Leave the two fields empty if connecting a database without authentication.
	cfg := greptime.NewCfg("6qr5e68t5wpn.us-west-2.aws.greptime.cloud").
		WithDatabase("nowawfppg0gtgreptime_example-public").              // change to your real database
		WithPort(4001).                                                   // default port
		WithAuth("WxN5prHHwx1ATXMvduBlgy4K", "k3gK1yOfDosRVDwsGhpQltj0"). // `Username` and `Password`
		WithDialOptions(options...).                                      // specify your gRPC dail options
		WithCallOptions()                                                 // specify your gRPC call options

	client, err := greptime.NewClient(cfg)
	if err != nil {
		panic("failed to init client")
	}
	return client
}

func main() {
	fmt.Println("Hello, World!")
	// client := InitClient()
	// client.Query()
}
