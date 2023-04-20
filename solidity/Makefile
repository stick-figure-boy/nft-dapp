ABI_FILES := `./makefile.sh`
compile:
	npx hardhat compile
	npx typechain --target web3-v1 './artifacts/contracts/**/?(${ABI_FILES})'

launch:
	npx hardhat node

deploy:
	npx hardhat run --network localhost scripts/deploy.ts

clean:
	npx hardhat clean

run=
testing:
	REPORT_GAS=true npx hardhat test ./test/${run}.ts

testing-all:
	REPORT_GAS=true npx hardhat test
