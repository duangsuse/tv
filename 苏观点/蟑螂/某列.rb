require 'csv'
fp,N,idx=$*; idx=idx.to_i
puts CSV.read(fp).first(N.to_i).collect{|r|r[idx]}.join("\n")
