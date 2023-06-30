param (
  $SwitchName="HyperVSwitch",
  $Ip="192.168.2.254",
  $NatName="HyperVNAT",
  $InternalIpPrefix="192.168.2.0"
)

Remove-VMSwitch -Name $SwitchName -Force
New-VMSwitch -SwitchName $SwitchName -SwitchType Internal
New-NetIPAddress  -IPAddress $ip  -PrefixLength 24  -InterfaceAlias "vEthernet ($($SwitchName))"
Remove-NetNat -Name $NatName -Confirm:$false
New-NetNat -Name $NatName -InternalIPInterfaceAddressPrefix "$($InternalIpPrefix)/24"